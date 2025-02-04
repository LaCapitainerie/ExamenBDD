import { prisma } from "@/lib/prisma";
import { authRoute } from "@/lib/safe-route";
import { Issue } from "@/types/Prisma/Issue";
import { Label } from "@/types/Prisma/Label";
import { Label as LabelPrisma } from "@prisma/client";
import { warn } from "console";
import { NextResponse } from "next/server";
import * as z from "zod";

const name = "issue";

const POSTSchema = Issue.pick({ title: true, description: true, status: true }).extend({ labels: z.array(Label.shape["name"]) });
export const POST = authRoute
    .body(POSTSchema)
    .handler(async (req, { body, data }) => {

        try {

            const doesExist = await prisma.issue.findFirst({
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

            const labels : LabelPrisma[] = await prisma.label.findMany({
                where: {
                    userRelatedId: data.userId,
                    name: {
                        in: body.labels
                    }
                }
            }).catch((error) => {
                warn(error);
                throw new Error(`Error fetching labels`);
            });

            await prisma.issue.create({
                data: {
                    title: body.title,
                    description: body.description,
                    status: body.status,
                    userRelatedId: data.userId,
                    labels: {
                        connect: labels
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

            const result = await prisma.issue.findMany({
                where: {
                    userRelatedId: data.userId
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    status: true,
                }
            }).catch((error) => {
                throw new Error(`Error fetching ${name}s`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

const DELETESchema = Issue.pick({ id: true });
export const DELETE = authRoute
    .body(DELETESchema)
    .handler(async (req, { body, data }) => {
        
        try {

            await prisma.issue.deleteMany({
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

const PUTSchema = Issue.pick({ id: true, title: true, description: true, status: true }).extend({ labels: z.array(Label.shape["name"]) });
export const PUT = authRoute
    .body(PUTSchema)
    .handler(async (req, { body, data }) => {
        
        try {

            const labels : LabelPrisma[] = await prisma.label.findMany({
                where: {
                    userRelatedId: data.userId,
                    name: {
                        in: body.labels
                    }
                }
            }).catch((error) => {
                warn(error);
                throw new Error(`Error fetching labels`);
            });

            console.log(labels);
            

            await prisma.issue.update({
                where: {
                    id: body.id,
                    userRelatedId: data.userId,
                },
                data: {
                    title: body.title,
                    description: body.description,
                    status: body.status,
                    labels: {
                        set: labels
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