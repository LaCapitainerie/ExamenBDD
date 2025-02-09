

## 1. Contexte

1. [x] De gérer un catalogue de produits (références, prix unitaire, quantité en stock…).

Table de donnée

2. [x] De classer les produits par catégories.

Inclus dans la table

3. [x] De lier chaque produit à un fournisseur pour identifier son origine (un produit peut avoir plusieurs fournisseurs).

Data Table Row Format Enumération

4. [x] De gérer des commandes clients et leurs lignes (produits commandés, quantités, prix unitaire appliqué, etc.).

Bento Avec Graphiques

5. [ ] De répertorier les clients qui passent commande (nom, adresse, coordonnées…).

## 2. MCD / MLD

## 3. API JS

#### CRUD
- [ ] Produits
- [ ] Catégories
- [x] Fournisseurs
- [ ] Commandes
- [ ] Lignes_Commande
- [ ] Clients

### 4. Audit
### 5. V2

Corrigeant les failles et incohérences identifiées (requêtes paramétrées, validation des données, etc.).
1. [x] Zod parser
2. [x] Prisma built-in request
3. [x] NextAuth

### 6. En plus

4. [x] Lister les commandes par année Ex. GET /commandes?start=2023-01-01&end=2023-12-31.
5. [x] Rechercher les commandes d’un client Ex. GET /clients/:id/commandes.
6. [x] Lister les commandes qui contiennent un article précis Ex. GET /produits/:id/commandes.
7. [x] Recherche multi-critères (client, date, statut, produit…)
8. [x] Statistiques simples (produits les plus vendus, total des ventes sur une période…)
9. [ ] Gestion fine du stock (décrémentation automatique, blocage si insuffisant…)
10. [ ] Notifications de stock faible (ex. GET /produits/stock-faible?seuil=10)

### 7. Livrable Final

Rédigez un document de synthèse :
- [ ] Présentation du schéma de la base de données (entités, relations, types de champs),
- [ ] Liste des endpoints de l’API (routes, paramètres, retours JSON), avec des exemples d’appels, 
- [ ] Résumé de l’audit V1, des problèmes détectés et des solutions adoptées en V2 (ex. requêtes paramétrées, contrôle des champs…),
- [ ] Publiez le code source sur GitHub avec un README expliquant l’installation et un historique de commits (V1 → Audit → V2)

### 8. Optionnel

11. [x] Utiliser un ORM (Sequelize, TypeORM…) pour automatiser la gestion des tables et des requêtes, 
12. [x] Mettre en place de la sécurité (authentification via sessions/cookies ou JWT),
13. [ ] Gérer des rôles de façon plus fine (admin, user…),
14. [x] Préparer un frontend (React, Vue, etc.)– mais ce n’est pas obligatoire à ce stade