rm make-node-app.sh
echo "Step 1 --> Create Project Files =============================="
touch README.md
touch index.js
touch .gitignore
touch .env

echo "Step 2 --> Git Ignore ========================================"
echo "/node_modules" >> .gitignore
echo "/.env" >> .gitignore

echo "Step 3 --> Initializing a Project ============================"
npm init -y
npm pkg set type="module"
npm pkg set scripts.start="node index.js"
npm pkg set scripts.dev="nodemon index.js"

echo "Step 4 --> Install Dependencies =============================="
npm install express --verbose
npm install dotenv --verbose

echo "Step 5 --> Install Dev Dependencies =========================="
npm install nodemon --save-dev --verbose

echo "Step 6 --> Initializing a Repositore ========================="
git init
git add .
git commit -m "Simple Node.js Setup"


# '== Final Health Check ======================================= OK =='
clear
echo "🔍 Checking Health ... ======================================="
echo ""

echo "Step 1 --> Create Project Files =============================="
echo "✅ Create file: README.md"
echo "✅ Create file: index.js"
echo "✅ Create file: .gitignore"
echo "✅ Create file: .env"

echo ""
echo "Step 2 --> Git Ignore ========================================"
cat .gitignore

echo ""
echo "Step 3 --> Initializing a Project ============================"
cat package.json | grep '"type"'
cat package.json | grep '"start"'
cat package.json | grep '"dev"'

echo ""
echo "Step 4 --> Install Dependencies =============================="
if [ -d "node_modules/express" ]; then echo "✅ express: Installed"; else echo "❌ express: NOT Installed"; fi
if [ -d "node_modules/dotenv" ]; then echo "✅ dotenv: Installed"; else echo "❌ dotenv: NOT Installed"; fi

echo ""
echo "Step 5 --> Install Dev Dependencies =========================="
if [ -d "node_modules/nodemon" ]; then echo "✅ nodemon: Installed"; else echo "❌ nodemon: NOT Installed"; fi

echo ""
echo "Step 6 --> Initializing a Repositore ========================="
git log --oneline

echo ""
echo " == More Info ================================================"
echo "NODE Version --> $(node -v)"
echo "NPM  Version --> $(npm -v)"

echo ""
