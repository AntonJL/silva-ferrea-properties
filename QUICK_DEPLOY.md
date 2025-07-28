# ⚡ Quick Deployment Guide

## 🎯 One-Click Deployment

Your Silva Ferrea Properties app is ready for deployment! Here's the fastest way to get it live:

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Backend (Railway)
1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory: `backend`
5. Add environment variables:
   ```
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production
   PORT=5000
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

### Step 3: Deploy Frontend (Vercel)
1. Go to [Vercel](https://vercel.com)
2. Click "New Project" → Import your GitHub repo
3. Set root directory: `frontend`
4. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   VITE_APP_NAME=Silva Ferrea Properties
   ```

### Step 4: Set Up Database
Choose one:
- **Railway PostgreSQL**: Add PostgreSQL service in Railway
- **Supabase**: Create project at [supabase.com](https://supabase.com)
- **Neon**: Create project at [neon.tech](https://neon.tech)

### Step 5: Run Migrations
```bash
# If using Railway CLI
railway login
railway link
cd backend
railway run npm run prisma:migrate
railway run npm run prisma:generate
```

## 🚀 Alternative: All-in-One Vercel

If Railway doesn't work, deploy everything to Vercel:

1. **Move backend to Vercel Functions**:
   ```bash
   mkdir frontend/api
   cp -r backend/src/* frontend/api/
   ```

2. **Deploy to Vercel**:
   - Connect GitHub repo
   - Set root directory: `frontend`
   - Add environment variables

## 📊 Database Options

| Provider | Free Tier | Setup |
|----------|-----------|-------|
| **Supabase** | 500MB | Easiest |
| **Neon** | 3GB | Great performance |
| **Railway** | Included | Integrated |
| **PlanetScale** | 1GB | MySQL compatible |

## 🔧 Troubleshooting

### Common Issues:
- **CORS errors**: Check `CORS_ORIGIN` matches frontend URL exactly
- **Database connection**: Verify `DATABASE_URL` is correct
- **Build failures**: Check Railway/Vercel logs

### Quick Fixes:
```bash
# Regenerate Prisma client
cd backend && npm run prisma:generate

# Rebuild project
npm run build

# Check logs
railway logs  # or vercel logs
```

## 📞 Support

- **Railway**: [Discord](https://discord.gg/railway)
- **Vercel**: [Documentation](https://vercel.com/docs)
- **Project**: Create GitHub issue

---

🎉 **Your app will be live in 10 minutes!**