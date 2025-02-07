const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.categories.createMany({
    data: [
      { name: 'Militaire', description: 'Avions militaires' },
      { name: 'Commercial', description: 'Avions commerciaux' },
      { name: 'Hélicoptère', description: 'Hélicoptères de transport' },
    ],
  });

  await prisma.fournisseur.createMany({
    data: [
      { name: 'Boeing', description: 'Boeing Company', email: 'contact@boeing.com' },
      { name: 'Airbus', description: 'Airbus Company', email: 'contact@airbus.com' },
      { name: 'Lockheed Martin', description: 'Lockheed Martin Company', email: 'contact@lockheed.com' },
    ],
  });

  await prisma.produit.create({
    data: {
      name: 'F-22 Raptor',
      reference: 'F22',
      type: 'CHASSE',
      basePrice: 150000000,
      quantity: 5,
      description: 'Avion de chasse furtif',
      categories: {
        connect: { name: 'Militaire' },
      },
      fournisseurs: {
        connect: { name: 'Lockheed Martin' },
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
