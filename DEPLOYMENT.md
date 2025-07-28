# 🚀 Deployment Guide - Silva Ferrea Properties

This guide will help you deploy your full-stack property management application to production.

## 📋 Prerequisites

- GitHub account
- Railway account (for backend)
- Vercel account (for frontend)
- PostgreSQL database (Railway, Supabase, or Neon)

## 🎯 Deployment Strategy

We'll deploy using:
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Node.js + Express)
- **Database**: Railway PostgreSQL or external provider

## 📦 Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/silva-ferrea-properties.git
   git push -u origin main
   ```

3. **Run the deployment script**:
   ```bash
   ./scripts/deploy.sh
   ```

## 🗄️ Step 2: Set Up Database

### Option A: Railway PostgreSQL (Recommended)
1. Go to [Railway](https://railway.app)
2. Create a new project
3. Add a PostgreSQL service
4. Copy the connection string

### Option B: Supabase (Alternative)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

### Option C: Neon (Alternative)
1. Go to [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string

## ⚙️ Step 3: Deploy Backend to Railway

1. **Create Railway Project**:
   - Go to [Railway](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

2. **Configure Service**:
   - Set the root directory to `backend`
   - Set the build command: `npm install && npm run build`
   - Set the start command: `npm start`

3. **Add Environment Variables**:
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   PORT=5000
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Deploy**:
   - Railway will automatically deploy when you push to GitHub
   - Wait for the build to complete
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

## 🌐 Step 4: Deploy Frontend to Vercel

1. **Create Vercel Project**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - Set the root directory to `frontend`
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-domain.railway.app/api
   VITE_APP_NAME=Silva Ferrea Properties
   ```

4. **Deploy**:
   - Vercel will automatically deploy
   - Copy the generated URL (e.g., `https://your-app.vercel.app`)

## 🔄 Step 5: Update Environment Variables

1. **Update Backend CORS**:
   - Go back to Railway
   - Update `CORS_ORIGIN` with your Vercel frontend URL

2. **Update Frontend API URL**:
   - Go back to Vercel
   - Update `VITE_API_URL` with your Railway backend URL

## 🗃️ Step 6: Run Database Migrations

1. **Connect to your Railway backend**:
   ```bash
   # Get your Railway CLI token from Railway dashboard
   railway login
   railway link
   ```

2. **Run migrations**:
   ```bash
   cd backend
   railway run npm run prisma:migrate
   railway run npm run prisma:generate
   ```

## 🧪 Step 7: Test Your Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Visit `your-backend-url/api/health`
3. **Test API Docs**: Visit `your-backend-url/api/docs`

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure `CORS_ORIGIN` is set correctly
   - Check that the frontend URL is exact (including protocol)

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is correct
   - Ensure database is accessible from Railway

3. **Build Failures**:
   - Check Railway logs for build errors
   - Ensure all dependencies are in `package.json`

4. **Environment Variables**:
   - Double-check all environment variables are set
   - Restart services after changing environment variables

### Useful Commands:

```bash
# Check Railway logs
railway logs

# Check Railway status
railway status

# Redeploy backend
railway up

# Run database commands
railway run npm run prisma:migrate
railway run npm run prisma:generate
```

## 📊 Monitoring

- **Railway Dashboard**: Monitor backend performance and logs
- **Vercel Dashboard**: Monitor frontend performance and analytics
- **Database**: Monitor connection and performance

## 🔒 Security Considerations

1. **JWT Secret**: Use a strong, random secret
2. **Database**: Use connection pooling in production
3. **Rate Limiting**: Adjust based on your needs
4. **CORS**: Only allow necessary origins
5. **Environment Variables**: Never commit secrets to Git

## 📈 Scaling

- **Railway**: Automatically scales based on traffic
- **Vercel**: Automatically scales globally
- **Database**: Consider upgrading to paid plans for better performance

## 🆘 Support

- **Railway**: [Discord](https://discord.gg/railway)
- **Vercel**: [Documentation](https://vercel.com/docs)
- **Project Issues**: Create an issue in your GitHub repository

---

🎉 **Congratulations!** Your Silva Ferrea Properties application is now deployed and ready for production use!