-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CARGO', 'CHASSE', 'TRANSPORT', 'HELICOPTERE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneCommande" (
    "id" TEXT NOT NULL,
    "avionId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LigneCommande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToProduit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoriesToProduit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FournisseurToProduit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FournisseurToProduit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CommandeToLigneCommande" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CommandeToLigneCommande_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_email_key" ON "Fournisseur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LigneCommande_id_key" ON "LigneCommande"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_id_key" ON "Commande"("id");

-- CreateIndex
CREATE INDEX "_CategoriesToProduit_B_index" ON "_CategoriesToProduit"("B");

-- CreateIndex
CREATE INDEX "_FournisseurToProduit_B_index" ON "_FournisseurToProduit"("B");

-- CreateIndex
CREATE INDEX "_CommandeToLigneCommande_B_index" ON "_CommandeToLigneCommande"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneCommande" ADD CONSTRAINT "LigneCommande_avionId_fkey" FOREIGN KEY ("avionId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToProduit" ADD CONSTRAINT "_CategoriesToProduit_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToProduit" ADD CONSTRAINT "_CategoriesToProduit_B_fkey" FOREIGN KEY ("B") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FournisseurToProduit" ADD CONSTRAINT "_FournisseurToProduit_A_fkey" FOREIGN KEY ("A") REFERENCES "Fournisseur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FournisseurToProduit" ADD CONSTRAINT "_FournisseurToProduit_B_fkey" FOREIGN KEY ("B") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommandeToLigneCommande" ADD CONSTRAINT "_CommandeToLigneCommande_A_fkey" FOREIGN KEY ("A") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommandeToLigneCommande" ADD CONSTRAINT "_CommandeToLigneCommande_B_fkey" FOREIGN KEY ("B") REFERENCES "LigneCommande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insérer des catégories
INSERT INTO Categories (id, name, description, createdAt, updatedAt) VALUES
  (uuid(), 'Militaire', 'Avions militaires', NOW(), NOW()),
  (uuid(), 'Commercial', 'Avions commerciaux', NOW(), NOW()),
  (uuid(), 'Hélicoptère', 'Hélicoptères de transport', NOW(), NOW());

-- Insérer des fournisseurs
INSERT INTO Fournisseur (id, name, email, phone, address, city, country, postalCode, description, createdAt, updatedAt) VALUES
  (uuid(), 'Airbus', 'contact@airbus.com', '0123456789', 'Blagnac', 'Toulouse', 'France', '31707', 'Constructeur aéronautique', NOW(), NOW()),
  (uuid(), 'Boeing', 'contact@boeing.com', '0987654321', 'Seattle', 'Washington', 'USA', '98108', 'Constructeur aéronautique', NOW(), NOW());

-- Insérer des produits
INSERT INTO Produit (id, name, reference, type, basePrice, quantity, description, createdAt, updatedAt) VALUES
  (uuid(), 'A320', 'A320-001', 'TRANSPORT', 98000000, 10, 'Avion commercial moyen-courrier', NOW(), NOW()),
  (uuid(), 'F-16', 'F16-002', 'CHASSE', 55000000, 5, 'Avion de chasse américain', NOW(), NOW()),
  (uuid(), 'Black Hawk', 'BH-003', 'HELICOPTERE', 21000000, 8, 'Hélicoptère militaire polyvalent', NOW(), NOW());

-- Insérer des lignes de commande
INSERT INTO LigneCommande (id, avionId, price, createdAt, updatedAt) VALUES
  (uuid(), (SELECT id FROM Produit WHERE reference='A320-001'), 98000000, NOW(), NOW()),
  (uuid(), (SELECT id FROM Produit WHERE reference='F16-002'), 55000000, NOW(), NOW());

-- Insérer des commandes
INSERT INTO Commande (id, reference, date, status, total, userId, createdAt, updatedAt) VALUES
  (uuid(), 'CMD001', NOW(), 'En cours', 153000000, 'user-001', NOW(), NOW()),
  (uuid(), 'CMD002', NOW(), 'Livrée', 55000000, 'user-002', NOW(), NOW());