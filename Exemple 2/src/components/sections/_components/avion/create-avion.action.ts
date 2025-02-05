import { authActionClient } from "@/lib/actions/safe-action";
import { prisma } from "@/lib/prisma";
import { Avion } from "@/types/Prisma/Avion";
import { Categorie } from "@/types/Prisma/Categorie";
import { Fournisseur } from "@/types/Prisma/Fournisseur";
import * as z from "zod";

export const createAvionSchema = z.object({
    name: Avion.shape.name,
    description: Avion.shape.description,
    reference: Avion.shape.reference,
    type: Avion.shape.type,
    basePrice: Avion.shape.basePrice,
    quantity: Avion.shape.quantity,

    categories: Categorie.shape.name.array(),
    fournisseurs: Fournisseur.shape.name.array(),
});

export const createAvionAction = authActionClient
  .schema(createAvionSchema)
  .metadata({
    role: "admin",
  })
  .action(async ({ parsedInput: { name, description, reference, type, basePrice, quantity, categories, fournisseurs }, ctx }) => {
    const updatedOrganization = await prisma.avion.create({
      data: {
        name,
        description,
        reference,
        type,
        basePrice,
        quantity,
      },
    });

    return updatedOrganization;
  });