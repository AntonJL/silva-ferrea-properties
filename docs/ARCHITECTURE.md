# Silva Ferrea Properties - Architecture Documentation

## Overview

Silva Ferrea Properties is a comprehensive property management platform designed for individual and small-scale property owners. The application provides tools for tracking, managing, and analyzing real estate holdings with support for multiple user roles and comprehensive financial tracking.

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt for password hashing
- **Validation**: Zod for schema validation
- **Documentation**: Swagger/OpenAPI
- **File Upload**: Multer for handling file uploads

### Frontend
- **Framework**: React 18 with TypeScript
- **UI Library**: Chakra UI
- **State Management**: Zustand for global state, React Query for server state
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form

## Database Schema

### Core Entities

#### User
- Supports three roles: OWNER, MANAGER, ACCOUNTANT
- Role-based access control throughout the application
- JWT-based authentication

#### Property
- Comprehensive property information including financial details
- Links to loans, tenants, transactions, and maintenance events
- Ownership share tracking for partial ownership scenarios

#### Loan
- Tracks mortgage and loan information
- Links to specific properties
- Includes payment schedules and remaining balances

#### Tenant
- Tenant information and contact details
- Rent amount and deposit tracking
- Contract start/end dates
- Links to rent payment history

#### RentPayment
- Monthly rent payment tracking
- Status tracking (PAID, UNPAID, PARTIAL, OVERDUE)
- Invoice number generation

#### Transaction
- Financial transaction tracking
- Categorized transactions (rent, maintenance, loan payments, etc.)
- Receipt file attachments

#### MaintenanceEvent
- Property maintenance tracking
- Contractor information
- Cost estimation and actual cost tracking
- Status management (PLANNED, IN_PROGRESS, COMPLETED, CANCELLED)

#### Document
- File storage for property-related documents
- Categorized by type (insurance, invoice, contract, etc.)
- Links to properties, tenants, or maintenance events

## API Architecture

### Authentication & Authorization
- JWT-based authentication with refresh token support
- Role-based access control (RBAC)
- Middleware for protecting routes
- User session management

### RESTful API Design
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Consistent response format
- Proper HTTP status codes
- API versioning support

### File Upload System
- Local file storage (configurable for cloud storage)
- File type validation
- Size limits and security measures
- Organized file structure

## Frontend Architecture

### Component Structure
- Feature-based folder organization
- Reusable UI components
- Custom hooks for business logic
- Responsive design with mobile-first approach

### State Management
- **Zustand**: Global application state (auth, user preferences)
- **React Query**: Server state management and caching
- **Local State**: Component-specific state with useState/useReducer

### Routing
- Protected routes based on authentication
- Role-based route access
- Nested routing for complex features
- 404 handling and redirects

## Security Features

### Authentication
- Secure password hashing with bcrypt
- JWT token management
- Session timeout handling
- Password strength requirements

### Authorization
- Role-based access control
- Resource-level permissions
- API endpoint protection
- Data access restrictions

### Data Protection
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection
- CSRF protection

## Performance Considerations

### Backend
- Database query optimization
- Connection pooling
- Rate limiting
- Caching strategies

### Frontend
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- React Query caching

## Scalability

### Database
- Proper indexing strategies
- Query optimization
- Connection pooling
- Read replicas for scaling

### Application
- Stateless design
- Horizontal scaling support
- Microservices ready architecture
- API gateway integration capability

## Monitoring & Logging

### Backend
- Request/response logging
- Error tracking and reporting
- Performance monitoring
- Database query monitoring

### Frontend
- Error boundary implementation
- User interaction tracking
- Performance monitoring
- Crash reporting

## Deployment

### Environment Configuration
- Environment-specific configuration
- Secure secret management
- Database migration strategies
- Health check endpoints

### CI/CD Pipeline
- Automated testing
- Code quality checks
- Automated deployment
- Rollback strategies

## Future Enhancements

### Planned Features
- Integration with Swedish accounting systems (Fortnox, Bokio)
- Automated rent collection (Stripe, Bankgiro)
- Market value estimation APIs (Booli, Hemnet)
- Swedish tax export functionality
- Mobile application
- Advanced analytics and reporting

### Technical Improvements
- Real-time notifications
- Advanced search and filtering
- Bulk operations
- Data import/export functionality
- Multi-language support
- Advanced reporting and analytics

## Development Guidelines

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits
- Code review process

### Testing Strategy
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Performance testing

### Documentation
- API documentation with Swagger
- Component documentation
- Database schema documentation
- Deployment guides 