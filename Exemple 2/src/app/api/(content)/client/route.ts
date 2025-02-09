import { prisma } from "@/lib/prisma";
import { route } from "@/lib/safe-route";
import { NextResponse } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
    id: z.string().optional(),
});

export const GET = route
  .query(QuerySchema)
  .handler(async (req, { query }) => {
    try {
      const result = await prisma.user
        .findMany({
            where: {
                id: query.id,
            },
        })
        .catch((error) => {
          throw new Error(`Error fetching user`);
        });

      return NextResponse.json({ success: true, data: result });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      );
    }
  });
