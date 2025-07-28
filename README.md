# Silva Ferrea Properties

A comprehensive property management platform built with modern web technologies.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SilvaFerrea
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your database URL and JWT secret
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your API URL
   ```

4. **Set up database**
   ```bash
   cd backend
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. **Start development servers**
   ```bash
   # From project root
   npm run dev
   ```

   This will start:
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:5000/api/docs

## 🏗️ Architecture

### Backend (Node.js + Express + Prisma)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Validation**: Zod schemas
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate limiting

### Frontend (React + Vite + Chakra UI)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: React Icons

## 📁 Project Structure

```
SilvaFerrea/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── lib/           # Utilities
│   ├── prisma/            # Database schema & migrations
│   └── package.json
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── features/      # Feature-based modules
│   │   ├── stores/        # State management
│   │   └── theme.ts       # Chakra UI theme
│   └── package.json
├── docs/                  # Documentation
└── scripts/               # Deployment scripts
```

## 🚀 Deployment

### Quick Deployment

Run the deployment preparation script:
```bash
./scripts/deploy.sh
```

### Deployment Options

We provide multiple deployment options to suit your needs:

1. **🚀 Railway + Vercel (Recommended)**
   - Backend: Railway (Node.js hosting)
   - Frontend: Vercel (React hosting)
   - Database: Railway PostgreSQL or Supabase
   - Cost: $10-40/month

2. **🌐 Alternative Platforms**
   - Fly.io + Vercel
   - Render + Vercel
   - AWS Free Tier
   - DigitalOcean App Platform

📖 **Detailed deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
🔄 **Alternative options**: [DEPLOYMENT_ALTERNATIVES.md](./DEPLOYMENT_ALTERNATIVES.md)
```bash
./scripts/deploy.sh
```

### Manual Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions on deploying to:
- **Backend**: Render.com
- **Frontend**: Vercel.com
- **Database**: Supabase, Railway, or Neon

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm test` - Run tests for both frontend and backend

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📊 Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Owner, Manager, Accountant)

### Property Management
- Property listings with details
- Property status tracking
- Photo management
- Location mapping

### Tenant Management
- Tenant profiles and contact information
- Lease agreements
- Payment history
- Communication logs

### Financial Management
- Rent collection tracking
- Expense management
- Financial reporting
- Transaction history

### Maintenance
- Maintenance request tracking
- Work order management
- Vendor management
- Maintenance history

### Document Management
- Document upload and storage
- Document categorization
- Version control
- Access permissions

### Dashboard & Analytics
- Property overview
- Financial summaries
- Maintenance status
- Occupancy rates

## 🔒 Security Features

- JWT authentication with secure token handling
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation with Zod
- SQL injection protection with Prisma
- XSS protection with Helmet

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 API Documentation

When running the backend, visit `http://localhost:5000/api/docs` for interactive API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [documentation](docs/)
- Review the [deployment guide](docs/DEPLOYMENT.md)
- Open an issue on GitHub

## 🗺️ Roadmap

- [ ] Mobile application
- [ ] Advanced reporting and analytics
- [ ] Integration with payment gateways
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] API rate limiting improvements
- [ ] Real-time notifications
- [ ] File upload improvements 