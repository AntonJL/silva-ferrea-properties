# Deployment Guide

This guide will help you deploy the Silva Ferrea Properties application to Render (backend) and Vercel (frontend).

## Prerequisites

1. **Database**: Set up a PostgreSQL database (recommended: Supabase, Railway, or Neon)
2. **GitHub Account**: For connecting to deployment platforms
3. **Render Account**: For backend deployment
4. **Vercel Account**: For frontend deployment

## Backend Deployment (Render)

### 1. Database Setup

First, set up a PostgreSQL database:

**Option A: Supabase (Recommended)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database connection string from Settings > Database
4. Run migrations: `npx prisma migrate deploy`

**Option B: Railway**
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add PostgreSQL service
4. Get connection string from Variables tab

### 2. Render Deployment

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Click "New +" > "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name**: `silva-ferrea-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**
   Add these environment variables in Render dashboard:
   ```
   NODE_ENV=production
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_very_secure_jwt_secret
   JWT_EXPIRES_IN=7d
   PORT=10000
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your application
   - Note the generated URL (e.g., `https://silva-ferrea-backend.onrender.com`)

## Frontend Deployment (Vercel)

### 1. Vercel Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**
   Add this environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy your application
   - Note the generated URL (e.g., `https://silva-ferrea-frontend.vercel.app`)

### 2. Update CORS Configuration

After getting your frontend URL, update the `CORS_ORIGIN` environment variable in your Render backend:

```
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

## Post-Deployment Setup

### 1. Database Migrations

Run database migrations on your production database:

```bash
# Set DATABASE_URL to your production database
export DATABASE_URL="your_production_database_url"

# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 2. Seed Data (Optional)

If you want to seed initial data:

```bash
npx prisma db seed
```

### 3. Test Your Application

1. Visit your frontend URL
2. Try to register a new user
3. Test login functionality
4. Verify all features work correctly

## Environment Variables Reference

### Backend (Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `JWT_SECRET` | Secret for JWT tokens | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` |
| `PORT` | Server port | `10000` |
| `CORS_ORIGIN` | Frontend URL for CORS | `https://app.vercel.app` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.onrender.com/api` |

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify `DATABASE_URL` is correct
   - Ensure database is accessible from Render
   - Check if migrations have been run

2. **CORS Errors**
   - Verify `CORS_ORIGIN` matches your frontend URL exactly
   - Check browser console for CORS error details

3. **Build Failures**
   - Check build logs in Render/Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation passes locally

4. **JWT Errors**
   - Ensure `JWT_SECRET` is set and secure
   - Check token expiration settings

### Getting Help

1. Check the deployment platform logs
2. Verify environment variables are set correctly
3. Test locally with production environment variables
4. Check the application logs for specific error messages

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **JWT Secret**: Use a strong, random secret for JWT tokens
3. **Database**: Use connection pooling and SSL for database connections
4. **CORS**: Only allow necessary origins
5. **Rate Limiting**: Implement rate limiting for API endpoints

## Monitoring

1. **Render**: Use the built-in monitoring dashboard
2. **Vercel**: Check analytics and performance metrics
3. **Database**: Monitor connection usage and performance
4. **Application**: Implement logging for debugging

## Updates and Maintenance

1. **Automatic Deployments**: Both platforms support automatic deployments from Git
2. **Database Migrations**: Run migrations after each deployment
3. **Environment Variables**: Update as needed through platform dashboards
4. **Monitoring**: Regularly check application health and performance 