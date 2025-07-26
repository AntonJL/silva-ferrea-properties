#!/bin/bash

# Silva Ferrea Properties - Deployment Script
# This script handles automated deployments to various platforms

set -e

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

# Check if required tools are installed
check_dependencies() {
    print_status "Checking deployment dependencies..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "All dependencies are installed"
}

# Build Docker images
build_images() {
    print_status "Building Docker images..."
    
    docker-compose build --no-cache
    
    print_success "Docker images built successfully"
}

# Deploy to local Docker environment
deploy_local() {
    print_status "Deploying to local Docker environment..."
    
    docker-compose down
    docker-compose up -d
    
    print_success "Local deployment completed"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend API: http://localhost:5000"
    print_status "API Docs: http://localhost:5000/api/docs"
}

# Deploy to production
deploy_production() {
    print_status "Deploying to production..."
    
    # Check if production environment variables are set
    if [ -z "$PRODUCTION_DATABASE_URL" ]; then
        print_error "PRODUCTION_DATABASE_URL environment variable is not set"
        exit 1
    fi
    
    if [ -z "$PRODUCTION_JWT_SECRET" ]; then
        print_error "PRODUCTION_JWT_SECRET environment variable is not set"
        exit 1
    fi
    
    # Build production images
    docker-compose -f docker-compose.prod.yml build
    
    # Deploy to production
    docker-compose -f docker-compose.prod.yml up -d
    
    print_success "Production deployment completed"
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Please install it first: npm i -g vercel"
        exit 1
    fi
    
    # Deploy frontend
    cd frontend
    vercel --prod
    cd ..
    
    print_success "Vercel deployment completed"
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    cd backend
    npm run prisma:migrate
    cd ..
    
    print_success "Database migrations completed"
}

# Seed database
seed_database() {
    print_status "Seeding database..."
    
    cd backend
    npm run prisma:seed
    cd ..
    
    print_success "Database seeding completed"
}

# Health check
health_check() {
    print_status "Performing health checks..."
    
    # Check if services are running
    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        print_success "Backend health check passed"
    else
        print_error "Backend health check failed"
        exit 1
    fi
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend health check passed"
    else
        print_error "Frontend health check failed"
        exit 1
    fi
    
    print_success "All health checks passed"
}

# Clean up
cleanup() {
    print_status "Cleaning up..."
    
    docker-compose down
    docker system prune -f
    
    print_success "Cleanup completed"
}

# Show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  local       Deploy to local Docker environment"
    echo "  production  Deploy to production environment"
    echo "  vercel      Deploy frontend to Vercel"
    echo "  build       Build Docker images"
    echo "  migrate     Run database migrations"
    echo "  seed        Seed database with sample data"
    echo "  health      Perform health checks"
    echo "  cleanup     Clean up Docker resources"
    echo "  help        Show this help message"
    echo ""
    echo "Environment variables for production:"
    echo "  PRODUCTION_DATABASE_URL  Production database URL"
    echo "  PRODUCTION_JWT_SECRET    Production JWT secret"
}

# Main function
main() {
    case "${1:-help}" in
        local)
            check_dependencies
            build_images
            deploy_local
            health_check
            ;;
        production)
            check_dependencies
            deploy_production
            health_check
            ;;
        vercel)
            deploy_vercel
            ;;
        build)
            check_dependencies
            build_images
            ;;
        migrate)
            run_migrations
            ;;
        seed)
            seed_database
            ;;
        health)
            health_check
            ;;
        cleanup)
            cleanup
            ;;
        help|*)
            show_usage
            ;;
    esac
}

# Run main function
main "$@" 