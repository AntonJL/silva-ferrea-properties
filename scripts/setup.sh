#!/bin/bash

# Silva Ferrea Properties - Setup Script
# This script sets up the development environment for the project

set -e

echo "🚀 Setting up Silva Ferrea Properties..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js $(node -v) is installed"
}

# Check if PostgreSQL is installed
check_postgres() {
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not installed or not in PATH."
        print_warning "Please install PostgreSQL 14+ and ensure it's running."
        print_warning "You can download it from: https://www.postgresql.org/download/"
    else
        print_success "PostgreSQL is installed"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing root dependencies..."
    npm install
    
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    print_success "All dependencies installed"
}

# Setup environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Backend environment
    if [ ! -f backend/.env ]; then
        cp backend/env.example backend/.env
        print_success "Created backend/.env from template"
    else
        print_warning "backend/.env already exists, skipping..."
    fi
    
    # Frontend environment
    if [ ! -f frontend/.env ]; then
        cat > frontend/.env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Silva Ferrea Properties
EOF
        print_success "Created frontend/.env"
    else
        print_warning "frontend/.env already exists, skipping..."
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    cd backend
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npm run prisma:generate
    
    # Run migrations
    print_status "Running database migrations..."
    npm run prisma:migrate
    
    # Seed database
    print_status "Seeding database with sample data..."
    npm run prisma:seed
    
    cd ..
    
    print_success "Database setup completed"
}

# Create uploads directory
setup_uploads() {
    print_status "Setting up uploads directory..."
    
    mkdir -p backend/uploads/documents
    mkdir -p backend/uploads/receipts
    mkdir -p backend/uploads/maintenance
    
    print_success "Uploads directory created"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Configure your database connection in backend/.env"
    echo "2. Start the development servers:"
    echo "   npm run dev"
    echo ""
    echo "The application will be available at:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5000"
    echo "   API Docs: http://localhost:5000/api/docs"
    echo ""
    echo "Default login credentials:"
    echo "   Email: admin@silvaferrea.com"
    echo "   Password: admin123"
    echo ""
    echo "For more information, see the README.md file."
}

# Main setup function
main() {
    print_status "Starting Silva Ferrea Properties setup..."
    
    check_node
    check_postgres
    install_dependencies
    setup_env
    setup_database
    setup_uploads
    show_next_steps
}

# Run main function
main "$@" 