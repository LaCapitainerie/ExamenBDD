const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const createdCategories = await prisma.categories.createManyAndReturn({
    data: [
      { name: "Militaire", description: "Avions militaires" },
      { name: "Commercial", description: "Avions commerciaux" },
      { name: "Hélicoptère", description: "Hélicoptères de transport" },
      { name: "Cargo", description: "Avions de fret" },
      { name: "Drone", description: "Drones militaires et civils" },
      { name: "Affaires", description: "Jets privés" },
      {
        name: "Expérimental",
        description: "Prototypes et avions en développement",
      },
      { name: "Agricole", description: "Avions pour l'épandage agricole" },
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
      {
        name: "Dassault Aviation",
        description: "Dassault Aviation",
        email: "contact@dassault.com",
      },
      {
        name: "Embraer",
        description: "Embraer S.A.",
        email: "contact@embraer.com",
      },
      {
        name: "Northrop Grumman",
        description: "Northrop Grumman Corp",
        email: "contact@northrop.com",
      },
      {
        name: "Sukhoi",
        description: "Sukhoi Corporation",
        email: "contact@sukhoi.com",
      },
    ],
    skipDuplicates: true,
  });

  const toCreate = [
      {
          name: "F-22 Raptor",
          reference: "F22",
          type: "CHASSE",
          basePrice: 150000000,
          quantity: 5,
          description: "Avion de chasse furtif",
          categories: { connect: { name: "Militaire" } },
          fournisseurs: { connect: { name: "Lockheed Martin" } },
        },
        {
          name: "A380",
          reference: "A380",
          type: "TRANSPORT",
          basePrice: 300000000,
          quantity: 10,
          description: "Avion de transport commercial",
          categories: { connect: { name: "Commercial" } },
          fournisseurs: { connect: { name: "Airbus" } },
        },
        {
          name: "Rafale",
          reference: "RAF",
          type: "CHASSE",
          basePrice: 90000000,
          quantity: 8,
          description: "Avion de chasse polyvalent",
          categories: { connect: { name: "Militaire" } },
          fournisseurs: { connect: { name: "Dassault Aviation" } },
        },
        {
          name: "C-130 Hercules",
          reference: "C130",
          type: "TRANSPORT",
          basePrice: 75000000,
          quantity: 12,
          description: "Avion de transport militaire",
          categories: { connect: { name: "Militaire" } },
          fournisseurs: { connect: { name: "Lockheed Martin" } },
        },
        {
          name: "MQ-9 Reaper",
          reference: "MQ9",
          type: "DRONE",
          basePrice: 15000000,
          quantity: 20,
          description: "Drone militaire armé",
          categories: { connect: { name: "Drone" } },
          fournisseurs: { connect: { name: "Northrop Grumman" } },
        },
        {
          name: "Sukhoi Su-57",
          reference: "SU57",
          type: "CHASSE",
          basePrice: 120000000,
          quantity: 6,
          description: "Avion de chasse furtif russe",
          categories: { connect: { name: "Militaire" } },
          fournisseurs: { connect: { name: "Sukhoi" } },
        }
  ].map(async (product) => {
      return await prisma.produit.create({
          data: product,
      });
  })

  const createdProduits = await Promise.all(toCreate);

  const createdLigneCommande = await prisma.ligneCommande.createManyAndReturn(
    {
      data: await createdProduits.map(
        (produit: { id: any; basePrice: number }) => ({
          avionId: produit.id,
          price: produit.basePrice + Math.floor(Math.random() * 10000),
        })
      ),
      skipDuplicates: true,
    }
  );

  const createdCommande = await prisma.commande.create({
    data: {
      reference: "CMD001",
      date: new Date(),
      userId: "1",
      avions: {
        connect: createdLigneCommande.map((ligne: { id: any }) => ({
          id: ligne.id,
        })),
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
