# Silva Ferrea Properties

A comprehensive property management platform tailored for individual or small-scale property owners to track, manage, and analyze their real estate holdings.

## 🏠 Features

### Core Modules
- **Property Registry**: Manage properties with detailed information including ownership, loans, and market values
- **Tenancy Module**: Track tenants, rent payments, and generate invoices
- **Financial Accounting**: Record and analyze income, expenses, and cash flow
- **Maintenance Tracker**: Log and monitor property maintenance activities
- **Document Vault**: Store and organize property-related documents
- **Capital Health Dashboard**: Visualize portfolio performance and equity metrics

### User Roles
- **Owner**: Full access to all features
- **Manager**: Limited access (cannot edit ownership/equity details)
- **Accountant**: Read-only access with transaction management capabilities

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript, Chakra UI
- **Backend**: Node.js with Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with role-based access control
- **File Storage**: Local file system (configurable for cloud storage)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Automated Setup (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd silva-ferrea-properties
```

2. Run the setup script:
```bash
./scripts/setup.sh
```

3. Configure your database connection in `backend/.env`

4. Start the development servers:
```bash
npm run dev
```

### Manual Setup

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
cp backend/env.example backend/.env
```

3. Configure your database connection in `backend/.env`

4. Set up the database:
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

5. Start the development servers:
```bash
npm run dev
```

## 🌐 Access Points

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs

## 🔑 Default Login

After running the seed script, you can login with:
- **Email**: admin@silvaferrea.com
- **Password**: admin123

## 📁 Project Structure

```
silva-ferrea-properties/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Feature-based modules
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── stores/         # Zustand state stores
│   │   └── utils/          # Utility functions
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── lib/           # Shared libraries
│   │   └── utils/         # Utility functions
│   └── prisma/            # Database schema and migrations
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md    # System architecture
│   └── API.md             # API documentation
└── scripts/               # Setup and utility scripts
```

## 📚 Documentation

- [Architecture Documentation](docs/ARCHITECTURE.md) - System design and technical details
- [API Documentation](docs/API.md) - Complete API reference
- [API Docs (Swagger)](http://localhost:5000/api/docs) - Interactive API documentation

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run install:all` - Install dependencies for all packages

### Backend
- `npm run dev:backend` - Start backend development server
- `npm run build:backend` - Build backend for production
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Frontend
- `npm run dev:frontend` - Start frontend development server
- `npm run build:frontend` - Build frontend for production

## 🗄 Database

The application uses PostgreSQL with Prisma ORM. The database schema includes:

- **Users** - Authentication and role management
- **Properties** - Property information and ownership
- **Loans** - Mortgage and loan tracking
- **Tenants** - Tenant information and contracts
- **RentPayments** - Monthly rent payment tracking
- **Transactions** - Financial transaction history
- **MaintenanceEvents** - Property maintenance tracking
- **Documents** - File storage and management

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection

## 🚀 Deployment

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/silva_ferrea_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV="development"
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Silva Ferrea Properties
```

## 🔮 Future Enhancements

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Review the [API documentation](http://localhost:5000/api/docs)
3. Open an issue on GitHub

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for Swedish property market requirements
- Focused on user experience and data security 