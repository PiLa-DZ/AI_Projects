#!/bin/bash

# Step 1 ===================================================================
step1() {
    clear
    echo ""
    echo "   Step 1 --> Install Dev Dependencies =========================="
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step1 "      npm install prisma@6 --save-dev --verbose";         then npm install prisma@6 --save-dev --verbose; fi
if step1 "      npm install @prisma/client@6 --save-dev --verbose"; then npm install @prisma/client@6 --save-dev --verbose; fi


# Step 2 ===================================================================
step2() {
    clear
    echo ""
    echo "   Step 2 --> Initializing a Project Prisma ====================="
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step2 "      npm prisma init "; then npx prisma init; fi

# Step 3 ===================================================================
step3() {
    clear
    echo ""
    echo "   ⚠️ Step 3 --> Clean schema.prisma File ⚠️ ===================="
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step3 '      echo "" > prisma/schema.prisma '; then echo "" > prisma/schema.prisma; fi

# Step 4 ===================================================================
step4() {
    clear
    echo ""
    echo "   Step 4 --> Write schema.prisma File =========================="
    echo '
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
}
    ' | bat --language rust --file-name Prisma # --style plain
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step4 '      echo "All this code to" > prisma/schema.prisma'; then 
    echo 'datasource db {
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
}
    ' >> prisma/schema.prisma
fi


# Step 5 ===================================================================
step5() {
    clear
    echo ""
    echo "   ⚠️ Clean .env File ⚠️ ====================================="
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step5 '      echo "" > .env '; then echo "" > .env; fi

# Step 6 ===================================================================
step6() {
    clear
    echo ""
    echo "   Step 6 --> Add DATABASE_URL To .env File ====================="
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step6 '      DATABASE_URL="mysql://admin:your_password@localhost:3306/Students_Courses_DB"'; then 
    echo 'DATABASE_URL="mysql://admin:your_password@localhost:3306/Students_Courses_DB"' >> .env; 
fi

# Step 7 ===================================================================
step7() {
    clear
    echo ""
    echo "   ⚠️ Step 7 --> Manual Step ⚠️ ================================="
    echo ""
    echo '      ⚠️ Warning: You have to drop database if exists =============='
    echo "         mysql -u admin -p" | bat --language bash --file-name "Bash Script" --style plain
    echo "            DROP DATABASE IF EXISTS Students_Courses_DB" | bat --language sql --file-name "MySQL" --style plain
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step7 "      No Auto Script Here ";         then echo "No thing happend "; fi


# Step 8 ===================================================================
step8() {
    clear
    echo ""
    echo "   Step 6 --> Genarate DATABASE ================================="
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step8 "      npx prisma migrate dev --name init"; then npx prisma migrate dev --name init; fi


# Step 9 ===================================================================
step9() {
    clear
    echo ""
    echo "   Step 9 ========================================================"
    echo "   ⚠️ Clean index.js ⚠️ ========================================"
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step9 '      echo ""> index.js'; then echo "" > index.js; fi


# Step 10 ===================================================================
step10() {
    clear
    echo ""
    echo "   Step 10 --> Write index.js for test ==========================="
    echo "
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
    " | bat --language javascript --file-name JavaScript # --style plain
    echo ""
    read -p "$1 " response
    case "$response" in [yY][eE][sS]|[yY]) return 0 ;; *) return 1 ;; esac
}
if step10 '      echo "All this code to" >> index.js'; then 
    echo "
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
    " >> index.js
fi



echo ""
echo "   *** 🚀 Have a great day sir! *** "
echo ""
