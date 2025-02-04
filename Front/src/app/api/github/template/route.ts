import { prisma } from "@/lib/prisma";
import { authRoute } from "@/lib/safe-route";
import { Milestone } from "@/types/Prisma/Milestone";
import { Template } from "@/types/Prisma/Template";
import { NextResponse } from "next/server";
import * as z from "zod";

const name = "template";

const POSTSchema = Template.pick({ title: true, description: true, public: true }).extend({ milestones: z.array(Milestone.shape["title"]).default([]), });
export const POST = authRoute
    .body(POSTSchema)
    .handler(async (req, { body, data }) => {

        try {

            const milestones = await prisma.milestone.findMany({
                where: {
                    userRelatedId: data.userId,
                    title: {
                        in: body.milestones
                    }
                }
            }).catch((error) => {
                throw new Error(`Error fetching milestones`);
            });

            await prisma.template.create({
                data: {
                    ...body,
                    userRelatedId: data.userId,
                    milestones: {
                        connect: milestones
                    }
                },
            }).catch((error) => {
                throw new Error(`Error creating ${name}`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }

    });

export const GET = authRoute
    .handler(async (req, { data }) => {
        
        try {

            const result = await prisma.template.findMany({
                where: {
                    userRelatedId: data.userId
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    public: true,
                }
            }).catch((error) => {
                throw new Error(`Error fetching ${name}s`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }

    });

export const DELETE = authRoute
    .handler(async (req, { data }) => {
        
        try {

            await prisma.template.deleteMany({
                where: {
                    userRelatedId: data.userId
                }
            }).catch((error) => {
                throw new Error(`Error deleting ${name}s`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }

    });

const PUTSchema = Template.pick({ id: true, title: true, description: true, public: true });
export const PUT = authRoute
    .body(PUTSchema)
    .handler(async (req, { body, data }) => {
        
        try {

            await prisma.template.update({
                where: {
                    id: body.id,
                    userRelatedId: data.userId,
                },
                data: {
                    title: body.title,
                    description: body.description,
                    public: body.public,
                }
            }).catch((error) => {
                throw new Error(`Error updating ${name}`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }

    });