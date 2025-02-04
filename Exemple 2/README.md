docker-compose up -d
cd Front
npx prisma migrate reset
npx prisma generate
npx prisma db push
npm run seed
npm run dev