"use server";

import { ActionError, authActionClient } from '@/lib/actions/safe-action';
import { prisma } from '@/lib/prisma';
import { Avion } from '@/types/Prisma/Avion';

const createAvion = Avion.pick({
  name: true,
  reference: true,
  type: true,
  basePrice: true,
  quantity: true,
  description: true,
}).extend({
  categories: Avion.shape.categories,
  fournisseurs: Avion.shape.fournisseurs
});

export const createAvionAction = authActionClient
  .schema(createAvion)
  .metadata({
    role: 'admin',
  })
  .action(async ({ parsedInput: data, ctx: { user } }) => {

    try {
      const createdAvion = await prisma.avion.create({
        data: {
          ...data,
          categories: {
            connect: data.categories,
          },
          fournisseurs: {
            connect: data.fournisseurs,
          },
        },
      });

      return createdAvion;
    } catch (error) {
      throw new ActionError('Error creating Avion');
    }

  });


