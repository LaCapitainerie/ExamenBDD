import { prisma } from "@/lib/prisma";
import { authRoute } from "@/lib/safe-route";
import { Issue } from "@/types/Prisma/Issue";
import { Milestone } from "@/types/Prisma/Milestone";
import { warn } from "console";
import { NextResponse } from "next/server";
import * as z from "zod";

const name = "milestone";

const POSTSchema = Milestone.pick({ title: true, description: true, dueDate: true }).extend({ issues: z.array(Issue.shape["title"]) });
export const POST = authRoute
    .body(POSTSchema)
    .handler(async (req, { body, data }) => {

        try {

            const doesExist = await prisma.milestone.findFirst({
                where: {
                    userRelatedId: data.userId,
                    title: body.title
                }
            }).catch((error) => {
                throw new Error(`Error checking if ${name} exists`);
            });

            if (doesExist) {
                return NextResponse.json({ success: false, error: `${name} already exists` }, { status: 400 });
            }

            const issues = await prisma.issue.findMany({
                where: {
                    userRelatedId: data.userId,
                    title: {
                        in: body.issues
                    }
                }
            }).catch((error) => {
                warn(error);
                throw new Error(`Error fetching issues`);
            });

            await prisma.milestone.create({
                data: {
                    title: body.title,
                    description: body.description,
                    dueDate: body.dueDate,
                    userRelatedId: data.userId,
                    issues: {
                        connect: issues
                    }
                }
            }).catch((error) => {
                console.log(error);
                
                throw new Error(`Error creating ${name}`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: `${error}`}, { status: 500 });
        }

    });

export const GET = authRoute
    .handler(async (req, { data }) => {
        
        try {

            const result = await prisma.milestone.findMany({
                where: {
                    userRelatedId: data.userId
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    dueDate: true,
                    issues: {
                        select: {
                            title: true
                        }
                    }
                }
            }).catch((error) => {
                throw new Error(`Error fetching ${name}s`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

const DELETESchema = Milestone.pick({ id: true });
export const DELETE = authRoute
    .body(DELETESchema)
    .handler(async (req, { body, data }) => {
        
        try {

            await prisma.milestone.deleteMany({
                where: {
                    userRelatedId: data.userId,
                    id: body.id
                }
            }).catch((error) => {
                throw new Error(`Error deleting ${name}s`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

const PUTSchema = Milestone.pick({ id: true, title: true, description: true, dueDate: true }).extend({ issues: z.array(Issue.shape["title"]) });
export const PUT = authRoute
    .body(PUTSchema)
    .handler(async (req, { body, data }) => {
        
        try {

            const issues = await prisma.issue.findMany({
                where: {
                    userRelatedId: data.userId,
                    title: {
                        in: body.issues
                    }
                }
            }).catch((error) => {
                warn(error);
                throw new Error(`Error fetching issues`);
            });

            await prisma.milestone.update({
                where: {
                    id: body.id,
                    userRelatedId: data.userId,
                },
                data: {
                    title: body.title,
                    description: body.description,
                    dueDate: body.dueDate,
                    issues: {
                        set: issues
                    }
                }
            }).catch((error) => {
                throw new Error(`Error updating ${name}`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });