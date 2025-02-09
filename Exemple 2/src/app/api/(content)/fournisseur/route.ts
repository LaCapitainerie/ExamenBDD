import { prisma } from "@/lib/prisma";
import { route } from "@/lib/safe-route";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = route.handler(async (req, { data }) => {
  try {
    const result = await prisma.fournisseur
      .findMany({
        select: {
          name: true,
          description: true,
          email: true,
          phone: true,
          address: true,
        },
      })
      .catch((error) => {
        throw new Error(`Error fetching fournisseurs`);
      });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
});

export const createFournisseurSchema = z.object({
  name: z.string(),
  description: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
});

export const POST = route
  .body(createFournisseurSchema)
  .handler(async (req, { body }) => {
    try {
      const result = await prisma.fournisseur.create({
        data: {
          name: body.name,
          description: body.description,
          email: body.email,
          phone: body.phone,
          address: body.address,
        },
      });

      return NextResponse.json({ success: true, data: result });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      );
    }

    
  });

export const PUT = route
  .params(z.object({ id: z.string() }))
  .body(createFournisseurSchema)
  .handler(async (req, { query, body }) => {
    try {
      const result = await prisma.fournisseur.update({
        where: {
          id: query.id as string,
        },
        data: {
          name: body.name,
          description: body.description,
          email: body.email,
          phone: body.phone,
          address: body.address,
        },
      });

      return NextResponse.json({ success: true, data: result });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      );
    }
  });

export const DELETE = route
  .params(z.object({ id: z.string() }))
  .handler(async (req, { query }) => {
    try {
      const result = await prisma.fournisseur.delete({
        where: {
          id: query.id as string,
        },
      });

      return NextResponse.json({ success: true, data: result });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      );
    }
  });
