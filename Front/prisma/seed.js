const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

  const Users = await prisma.user.createMany({
    data: [
        {
            prenom: "Jean",
            nom: "Dupont",
            email: "jean.dupont@host.com",
            password: "password",
            role: "mairie",
            nom_complet: "Jean Dupont",
        },
        {
            prenom: "Marie",
            nom: "Durand",
            email: "marie.durand@host.com",
            password: "password",
            role: "directrice",
            nom_complet: "Marie Durand",
        },
        {
            prenom: "Pierre",
            nom: "Martin",
            email: "pierre.martin@host.com",
            password: "password",
            role: "professeur",
            nom_complet: "Pierre Martin",
        },
    ],
    skipDuplicates: true,
  });

}

main()