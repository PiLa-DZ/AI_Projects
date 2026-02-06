echo "Step 1 --> Install Dev Dependencies =========================="
npm install prisma@6 --save-dev --verbose
npm install @prisma/client@6 --save-dev --verbose


echo "Step 2 --> Initializing a Project Prisma ====================="
npx prisma init

echo "Step 3 --> Clean schema.prisma File =========================="
echo "" > prisma/schema.prisma

echo "Step 4 --> Write schema.prisma File =========================="
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
' >> prisma/schema.prisma

echo "⚠️ Clean .env File Arter 5 Seconds... ⚠️ ======================="
sleep 1
echo "Step 5 --> Add DATABASE_URL To .env File ====================="
echo 'DATABASE_URL="mysql://admin:your_password@localhost:3306/Students_Courses_DB"' > .env

echo "Step 6 --> Genarate DATABASE ================================="
npx prisma migrate dev --name init


# '== Final Health Check ======================================= OK =='
echo "⚠️ Clear Screen After 5 Seconds ⚠️ ============================="
sleep 1
clear
echo ""
echo "   🔍 Checking Health ... ======================================="
echo ""

echo "   Step 1 --> Install Dev Dependencies =========================="
if [ -d "node_modules/prisma" ]; then         echo "   ✅ prisma         --> Installed"; else echo "   ❌ prisma         --> NOT Installed"; fi
if [ -d "node_modules/@prisma/client" ]; then echo "   ✅ @prisma/client --> Installed"; else echo "   ❌ @prisma/client --> NOT Installed"; fi

sleep 1
echo ""
echo "   Step 2 --> Initializing a Project Prisma ====================="
echo "   Command: npx prisma init ====================================="
echo "   ✅ Create File      --> prisma.config.ts"
echo "   ✅ Create Directory --> prisma"
echo "   ✅ Create File      --> prisma/schema.prisma"

sleep 1
echo ""
echo "   Step 3 --> Clean schema.prisma File =========================="
echo "   Command: echo "" > prisma/schema.prisma ======================"
echo "   ✅ Clean File       --> prisma/schema.prisma"

sleep 1
echo ""
echo "   Step 4 --> Write schema.prisma File =========================="
echo ""
echo '   ✅ Datasource DB    --> provider = "mysql"'
echo '   ✅ Datasource DB    --> url      = env("DATABASE")'
echo ""
echo '   ✅ Generator Client --> provider = "prisma-client-js"'
echo ""
echo '   ✅ Model User       --> id    Int     @id @default(autoincrement())'
echo '   ✅ Model User       --> email String  @unique'
echo '   ✅ Model User       --> name  String?'

sleep 1
echo ""
echo "   Step 5 --> Add DATABASE_URL To .env File ====================="
echo "   ✅ Command: echo 'DATABASE_URL' > .env ======================="

echo ""
echo "   Step 6 --> Manual Step ======================================="
echo '   ❌ Warning: You have to drop database if exists ==============
   mysql -u admin -p
       drop database if exists Students_Courses_DB
'

echo "   Step 4 --> Genarate DATABASE ================================="
echo "   ✅ Command: npx prisma migrate dev --name init ==============="

echo ""
sleep 2
