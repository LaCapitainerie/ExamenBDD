const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const createdCategories = await prisma.categories.createManyAndReturn({
    data: [
      { name: "Militaire", description: "Avions militaires" },
      { name: "Commercial", description: "Avions commerciaux" },
      { name: "Hélicoptère", description: "Hélicoptères de transport" },
    ],
    skipDuplicates: true,
  });

  const createdFournisseurs = await prisma.fournisseur.createManyAndReturn({
    data: [
      {
        name: "Boeing",
        description: "Boeing Company",
        email: "contact@boeing.com",
      },
      {
        name: "Airbus",
        description: "Airbus Company",
        email: "contact@airbus.com",
      },
      {
        name: "Lockheed Martin",
        description: "Lockheed Martin Company",
        email: "contact@lockheed.com",
      },
    ],
    skipDuplicates: true,
  });

  const createProduit1 = await prisma.produit.create({
    data: {
      name: "F-22 Raptor",
      reference: "F22",
      type: "CHASSE",
      basePrice: 150000000,
      quantity: 5,
      description: "Avion de chasse furtif",
      categories: {
        connect: { name: "Militaire" },
      },
      fournisseurs: {
        connect: { name: "Lockheed Martin" },
      },
    },
  });

  const createProduit2 = await prisma.produit.create({
    data: {
      name: "A380",
      reference: "A380",
      type: "TRANSPORT",
      basePrice: 300000000,
      quantity: 10,
      description: "Avion de transport commercial",
      categories: {
        connect: { name: "Commercial" },
      },
      fournisseurs: {
        connect: { name: "Airbus" },
      },
    },
  });

  const createdLigneCommande = await prisma.ligneCommande.createManyAndReturn({
      data: [
        {
          avionId: createProduit1.id,
          price: createProduit1.basePrice + 150,
        },
        {
          avionId: createProduit2.id,
          price: createProduit2.basePrice,
        },
      ],
      skipDuplicates: true,
  });

  const createdCommande = await prisma.commande.create({
    data: {
      reference: "CMD001",
      date: new Date(),
      userId: "1",
      avions: {
        connect: createdLigneCommande.map((ligne: { id: any; }) => ({ id: ligne.id })),
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
