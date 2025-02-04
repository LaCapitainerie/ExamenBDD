import { prisma } from "@/lib/prisma";
import { authRoute } from "@/lib/safe-route";
import { NextResponse } from "next/server";

export const GET = authRoute
    .handler(async (req, { data }) => {
        
        try {

            const result = await prisma.avion.findMany({
                select: {
                    name: true,
                    description: true,
                    basePrice: true,
                    quantity: true,
                    type: true,
                }
            }).catch((error) => {
                throw new Error(`Error fetching avions`);
            });

            return NextResponse.json({ success: true, data: result });

        } catch (error) {
            
            return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
        }

    });