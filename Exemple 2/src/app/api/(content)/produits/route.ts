import { prisma } from "@/lib/prisma";
import { route } from "@/lib/safe-route";
import { Avion } from "@/types/Prisma/Avion";
import { Categorie } from "@/types/Prisma/Categorie";
import { Fournisseur } from "@/types/Prisma/Fournisseur";
import { NextResponse } from "next/server";
import { z } from "zod";

const QueryOptionnalSchema = z.object({
    start: z.date().optional(),
    end: z.date().optional(),
})

export const GET = route
    .query(QueryOptionnalSchema)
    .handler(async (req, { body }) => {
        
        try {

            const result = await prisma.produit.findMany({
                include: {
                    fournisseurs: {
                        select: {
                            name: true
                        }
                    }
                }
            }).catch((error) => {
                throw new Error(`Error fetching avions`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

export const createAvionSchema = z.object({
    name: Avion.shape.name,
    reference: Avion.shape.reference,
    type: Avion.shape.type,
    basePrice: Avion.shape.basePrice,
    quantity: Avion.shape.quantity.default(1),
    description: Avion.shape.description.default(""),
    categories: Categorie.shape.name.array().default([]),
    fournisseurs: Fournisseur.shape.name.array().default([]),
})
export const POST = route
    .body(createAvionSchema)
    .handler(async (req, { body }) => {
        
        try {
            const result = await prisma.produit.create({
                data: {
                    name: body.name,
                    reference: body.reference,
                    type: body.type,
                    basePrice: body.basePrice,
                    quantity: body.quantity,
                    description: body.description,
                }
            }).catch((error) => {
                throw new Error(`Error creating avion`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

export const modifyAvionSchema = z.object({
    id: Avion.shape.id.optional(),
    name: Avion.shape.name.optional(),
    reference: Avion.shape.reference.optional(),
    type: Avion.shape.type.optional(),
    basePrice: Avion.shape.basePrice.optional(),
    quantity: Avion.shape.quantity.optional(),
    description: Avion.shape.description.optional(),
    categories: Categorie.shape.name.array().optional(),
    fournisseurs: Fournisseur.shape.name.array().optional(),
})
export const PUT = route
    .body(modifyAvionSchema)
    .handler(async (req, { body }) => {

        const NewObject: { [key: string]: any } = {};
        Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined) {
                NewObject[key] = value;
            }
        });
        
        try {
            const result = await prisma.produit.update({
                where: {
                    id: body.id
                },
                data: {
                    ...NewObject
                },
            }).catch((error) => {
                throw new Error(`Error updating avion`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });

const deleteAvionSchema = z.object({
    id: Avion.shape.id,
})
export const DELETE = route
    .query(deleteAvionSchema)
    .handler(async (req, { query }) => {
        
        try {
            const result = await prisma.produit.delete({
                where: {
                    id: query.id
                }
            }).catch((error) => {
                throw new Error(`Error deleting avion`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });