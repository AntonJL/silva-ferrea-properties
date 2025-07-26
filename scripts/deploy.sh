#!/bin/bash

# Silva Ferrea Properties Deployment Script
# This script helps prepare and deploy the application

set -e

echo "🚀 Silva Ferrea Properties Deployment Script"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Prerequisites check passed"

# Build backend
echo ""
print_status "Building backend..."
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Build TypeScript
npm run build

print_status "Backend build completed"

# Build frontend
echo ""
print_status "Building frontend..."
cd ../frontend

# Install dependencies
npm install

# Build for production
npm run build

print_status "Frontend build completed"

# Return to root
cd ..

echo ""
print_status "Build process completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Set up a PostgreSQL database (Supabase, Railway, or Neon)"
echo "2. Deploy backend to Render:"
echo "   - Go to render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repository"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables (see docs/DEPLOYMENT.md)"
echo ""
echo "3. Deploy frontend to Vercel:"
echo "   - Go to vercel.com"
echo "   - Create new project"
echo "   - Connect your GitHub repository"
echo "   - Set root directory to 'frontend'"
echo "   - Add VITE_API_URL environment variable"
echo ""
echo "4. Run database migrations:"
echo "   npx prisma migrate deploy"
echo ""
echo "📖 For detailed instructions, see: docs/DEPLOYMENT.md"
echo ""
print_status "Deployment preparation completed!" 