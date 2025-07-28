#!/bin/bash

echo "🚀 Silva Ferrea Properties - Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if all dependencies are installed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo "✅ Dependencies checked!"

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🎉 Project is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Railway:"
echo "   - Push to GitHub"
echo "   - Connect to Railway"
echo "   - Set environment variables"
echo ""
echo "2. Deploy frontend to Vercel:"
echo "   - Push to GitHub"
echo "   - Connect to Vercel"
echo "   - Set environment variables"
echo ""
echo "3. Update environment variables with actual URLs"
echo ""
echo "📚 See README.md for detailed deployment instructions" 