import { prisma } from "@/lib/prisma";
import { authRoute } from "@/lib/safe-route";
import { Label } from "@/types/Prisma/Label";
import { NextResponse } from "next/server";

const name = "label";

const POSTSchema = Label.pick({ name: true, description: true, color: true });
export const POST = authRoute
    .body(POSTSchema)
    .handler(async (req, { body, data }) => {

        try {

            const doesExist = await prisma.label.findFirst({
                where: {
                    userRelatedId: data.userId,
                    name: body.name
                }
            }).catch((error) => {
                throw new Error(`Error checking if ${name} exists`);
            });

            if (doesExist) {
                return NextResponse.json({ success: false, error: `${name} already exists` }, { status: 400 });
            }

            await prisma.label.create({
                data: {
                    name: body.name,
                    description: body.description,
                    color: body.color,
                    userRelatedId: data.userId,
                }
            }).catch((error) => {
                throw new Error(`Error creating ${name}`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

export const GET = authRoute
    .handler(async (req, { data }) => {
        
        try {

            const result = await prisma.label.findMany({
                where: {
                    userRelatedId: data.userId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    color: true,
                }
            }).catch((error) => {
                throw new Error(`Error fetching ${name}s`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

const DELETESchema = Label.pick({ id: true });
export const DELETE = authRoute
    .body(DELETESchema)
    .handler(async (req, { body, data }) => {
        
        try {

            await prisma.label.deleteMany({
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

const PUTSchema = Label.pick({ id: true, name: true, description: true, color: true });
export const PUT = authRoute
    .body(PUTSchema)
    .handler(async (req, { body, data }) => {
        
        try {

            await prisma.label.update({
                where: {
                    id: body.id,
                    userRelatedId: data.userId,
                },
                data: {
                    name: body.name,
                    description: body.description,
                    color: body.color,
                }
            }).catch((error) => {
                throw new Error(`Error updating ${name}`);
            });

            return NextResponse.json({ success: true, data: null });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });