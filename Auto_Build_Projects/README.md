# Stage 2: Now let's start with Prisma
```BASH
# Step 1: Initialize the Project
npm install prisma@6 --save-dev
npm install @prisma/client@6 --save-dev
npx prisma init
# Step 2: The Data Model (Your First Schema)
nvim prisma/schema.prisma
```
```Prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```
```BASH
# Step 3: Setup Local Database
## 1: Install MariaDB on Arch Linux
## 2: Setup MariaDB
## 3: Create admin and password
## 4: Past your DATABASE_URL in .env
nvim .env
DATABASE_URL="mysql://admin:your_password@localhost:3306/Students_Courses_DB"

# Step 4: The Magic of "Migrate"
# NOTE: You have to drop database if exists
mysql -u admin -p
    drop database if exists Students_Courses_DB
# We are going to tell Prisma to look at that text file and 
# physically create the tables in MariaDB.
npx prisma migrate dev --name init
# What just happened?
# 1. Prisma created a SQL migration file (a history of your changes).
# 2. Prisma created the User and Post tables in your database.
# 3. Prisma generated your Client.

# Step 5: The "Script" Test
# Create a file named index.js to see if we can save some data.
nvim index.js
```
```JavaScript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a new user and a post at the same time!
  const newUser = await prisma.user.create({
    data: {
      name: 'Nabil',
      email: 'nabil@example.com',
      posts: {
        create: { title: 'Learning Prisma is Awesome!' },
      },
    },
  });
  console.log('Created User:', newUser);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```
