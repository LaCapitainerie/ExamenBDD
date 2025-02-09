import { prisma } from "@/lib/prisma";
import { route } from "@/lib/safe-route";
import { CommandeObject } from "@/types/Prisma/Commande";
import { NextResponse } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
  status: CommandeObject.shape.status.optional(),
  reference: CommandeObject.shape.reference.optional(),
});

export const GET = route
  .query(QuerySchema)
  .handler(async (req, { query, params }) => {
    console.log(req, params);
    
    try {
      const result = await prisma.commande
        .findMany({
          include: {
            avions: {
                include: {
                    avion: true,
                },
            },
          },
          where: {
            date: {
              gte: query.start,
              lte: query.end,
            },
            userId: {
              equals: params.id,
            },
            status: {
                equals: query.status,
            },
            reference: {
              equals: query.reference,
            },
          },
        })
        .catch((error) => {
          throw new Error(`Error fetching commandes`);
        });

      return NextResponse.json({ success: true, data: result.map((commande) => ({ ...commande, total: commande.avions.map(a => a.price).reduce((a, b) => a + b) })) });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      );
    }
  });