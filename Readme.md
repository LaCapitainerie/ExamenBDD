Welcome to Aviation directory.

## How to setup the project from this

**Fill the .env with corresponding parameters, (rest are generic) :**

- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

**then execute this :**
```sh
docker-compose up -d

cd 'Exemple 2'

npx prisma migrate reset

npm run dev
```

![mcd|mld](./MCD%20BDD.drawio.png)