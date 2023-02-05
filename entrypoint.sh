# add permission to node_modules
chmod -R 777 ./node_modules

# generate prisma client
npx prisma generate

# push prisma model to db
npx prisma db push

# create default user admin.admin
npx prisma db execute --file createDefaultUser.sql

# start dev server
yarn dev
