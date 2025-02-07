import { prisma } from "@/lib/prisma";
import { route } from "@/lib/safe-route";
import { Commande } from "@/types/Prisma/Commande";
import { NextResponse } from "next/server";
import { z } from "zod";

const QueryOptionnalSchema = z.object({
  start: z.date().optional(),
  end: z.date().optional(),
});

export const GET = route
  .query(QueryOptionnalSchema)
  .handler(async (req, { query }) => {
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