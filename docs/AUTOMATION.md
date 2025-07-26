# Silva Ferrea Properties - Automation & CI/CD Guide

## Overview

This document outlines the comprehensive automation setup for Silva Ferrea Properties, including CI/CD pipelines, testing infrastructure, and deployment strategies.

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

#### Main CI Pipeline (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**

1. **Lint & Type Check**
   - Lints backend and frontend code
   - Runs TypeScript type checking
   - Ensures code quality standards

2. **Backend Tests**
   - Runs unit and integration tests
   - Uses PostgreSQL test database
   - Generates coverage reports
   - Uploads coverage to Codecov

3. **Frontend Tests**
   - Runs React component tests
   - Uses Vitest for fast testing
   - Generates coverage reports
   - Uploads coverage to Codecov

4. **E2E Tests**
   - Runs end-to-end tests
   - Tests full application flow
   - Uses test database with sample data

5. **Security Audit**
   - Runs npm audit
   - Integrates with Snyk for vulnerability scanning
   - Checks for security issues

6. **Build & Deploy**
   - Builds both frontend and backend
   - Creates deployment artifacts
   - Only runs on successful CI completion

#### Deployment Pipeline (`.github/workflows/deploy.yml`)

**Triggers:**
- Successful completion of main CI pipeline
- Only on `main` branch

**Jobs:**

1. **Frontend Deployment (Vercel)**
   - Deploys React app to Vercel
   - Uses Vercel CLI for deployment
   - Configures environment variables

2. **Backend Deployment (Railway)**
   - Deploys Node.js API to Railway
   - Handles database migrations
   - Sets up production environment

## 🧪 Testing Infrastructure

### Backend Testing

**Framework:** Jest + Supertest
**Database:** PostgreSQL (test instance)
**Coverage:** Codecov integration

**Test Structure:**
```
backend/src/__tests__/
├── setup.ts              # Test environment setup
├── auth.test.ts          # Authentication tests
├── properties.test.ts    # Property management tests
├── tenants.test.ts       # Tenant management tests
├── transactions.test.ts  # Financial transaction tests
└── maintenance.test.ts   # Maintenance tracking tests
```

**Running Tests:**
```bash
# Run all tests
cd backend && npm test

# Run tests with coverage
cd backend && npm run test:coverage

# Run tests in watch mode
cd backend && npm run test:watch
```

### Frontend Testing

**Framework:** Vitest + React Testing Library
**Environment:** jsdom
**Coverage:** Codecov integration

**Test Structure:**
```
frontend/src/__tests__/
├── setup.ts                    # Test environment setup
├── components/
│   ├── Layout.test.tsx        # Layout component tests
│   └── ...
├── features/
│   ├── auth/
│   │   ├── Login.test.tsx     # Login component tests
│   │   └── Register.test.tsx  # Register component tests
│   └── ...
└── stores/
    └── authStore.test.ts      # State management tests
```

**Running Tests:**
```bash
# Run all tests
cd frontend && npm test

# Run tests with coverage
cd frontend && npm run test:coverage

# Run tests in watch mode
cd frontend && npm run test:watch
```

### E2E Testing

**Framework:** Playwright (planned)
**Scope:** Critical user flows
**Environment:** Full application stack

**Test Scenarios:**
- User registration and login
- Property creation and management
- Tenant management
- Financial transaction recording
- Document upload and management

## 🐳 Docker & Containerization

### Development Environment

**Docker Compose Setup:**
```yaml
services:
  postgres:    # PostgreSQL database
  backend:     # Node.js API
  frontend:    # React application
  redis:       # Caching layer
```

**Quick Start:**
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

**Multi-stage Docker builds:**
- Optimized for production
- Security-focused configuration
- Non-root user execution
- Minimal image sizes

**Deployment Options:**
1. **Vercel** - Frontend hosting
2. **Railway** - Backend hosting
3. **Docker Swarm** - Self-hosted
4. **Kubernetes** - Enterprise deployment

## 🔧 Automation Scripts

### Setup Script (`scripts/setup.sh`)

**Features:**
- Automated environment setup
- Dependency installation
- Database initialization
- Sample data seeding

**Usage:**
```bash
# Run automated setup
./scripts/setup.sh

# Check prerequisites
./scripts/setup.sh check
```

### Deployment Script (`scripts/deploy.sh`)

**Features:**
- Multi-environment deployment
- Health checks
- Database migrations
- Rollback capabilities

**Usage:**
```bash
# Deploy to local environment
./scripts/deploy.sh local

# Deploy to production
./scripts/deploy.sh production

# Deploy frontend to Vercel
./scripts/deploy.sh vercel

# Run health checks
./scripts/deploy.sh health
```

## 🔐 Security Automation

### Security Scanning

**Tools:**
- **npm audit** - Dependency vulnerability scanning
- **Snyk** - Advanced security scanning
- **CodeQL** - Code security analysis
- **Dependabot** - Automated dependency updates

**Configuration:**
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "npm"
    directory: "/backend"
    schedule:
      interval: "weekly"
  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
```

### Environment Management

**Secrets Management:**
- GitHub Secrets for CI/CD
- Vercel Environment Variables
- Railway Environment Variables
- Local `.env` files for development

**Required Secrets:**
```bash
# GitHub Secrets
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
VERCEL_TOKEN=your-vercel-token
RAILWAY_TOKEN=your-railway-token
SNYK_TOKEN=your-snyk-token

# Vercel Environment Variables
VITE_API_URL=https://your-api.railway.app/api
VITE_APP_NAME=Silva Ferrea Properties

# Railway Environment Variables
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
```

## 📊 Monitoring & Observability

### Application Monitoring

**Tools:**
- **Vercel Analytics** - Frontend performance
- **Railway Metrics** - Backend performance
- **Sentry** - Error tracking
- **LogRocket** - User session replay

### Database Monitoring

**Tools:**
- **pgAdmin** - Database administration
- **Prisma Studio** - Database visualization
- **Railway Database** - Managed PostgreSQL

## 🚀 Deployment Strategies

### Blue-Green Deployment

**Strategy:**
1. Deploy new version to staging
2. Run automated tests
3. Switch traffic to new version
4. Monitor for issues
5. Rollback if necessary

### Canary Deployment

**Strategy:**
1. Deploy to small percentage of users
2. Monitor metrics and errors
3. Gradually increase traffic
4. Full deployment after validation

### Rollback Procedures

**Automated Rollback:**
- Health check failures trigger rollback
- Performance degradation detection
- Error rate threshold monitoring

**Manual Rollback:**
```bash
# Rollback to previous version
./scripts/deploy.sh rollback

# Emergency rollback
./scripts/deploy.sh emergency-rollback
```

## 📈 Performance Optimization

### Build Optimization

**Frontend:**
- Vite for fast builds
- Code splitting
- Tree shaking
- Image optimization

**Backend:**
- TypeScript compilation
- Prisma client generation
- Bundle optimization

### Runtime Optimization

**Caching:**
- Redis for session storage
- CDN for static assets
- Database query caching
- API response caching

**Database:**
- Connection pooling
- Query optimization
- Index management
- Migration strategies

## 🔄 Continuous Improvement

### Metrics & KPIs

**Development Metrics:**
- Build time
- Test coverage
- Deployment frequency
- Lead time for changes

**Application Metrics:**
- Response time
- Error rate
- User engagement
- Feature adoption

### Feedback Loops

**Automated Feedback:**
- Test results in PR comments
- Performance regression alerts
- Security vulnerability notifications
- Deployment status updates

**Manual Feedback:**
- Code review processes
- User feedback collection
- Performance monitoring
- Error tracking

## 🛠 Troubleshooting

### Common Issues

**CI/CD Failures:**
```bash
# Check workflow status
gh run list

# View workflow logs
gh run view <run-id>

# Rerun failed workflow
gh run rerun <run-id>
```

**Deployment Issues:**
```bash
# Check deployment status
./scripts/deploy.sh status

# View deployment logs
./scripts/deploy.sh logs

# Rollback deployment
./scripts/deploy.sh rollback
```

**Database Issues:**
```bash
# Check database connection
./scripts/deploy.sh db:check

# Run migrations
./scripts/deploy.sh migrate

# Reset database
./scripts/deploy.sh db:reset
```

### Debug Commands

```bash
# Check all services
docker-compose ps

# View service logs
docker-compose logs [service-name]

# Access service shell
docker-compose exec [service-name] sh

# Check network connectivity
docker-compose exec backend ping postgres
```

## 📚 Additional Resources

### Documentation
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Docker Documentation](https://docs.docker.com)

### Tools & Services
- [Codecov](https://codecov.io) - Code coverage
- [Snyk](https://snyk.io) - Security scanning
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay

### Best Practices
- [12 Factor App](https://12factor.net)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Security Best Practices](https://owasp.org/www-project-top-ten/) 