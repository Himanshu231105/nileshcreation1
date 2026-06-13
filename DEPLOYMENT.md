# Deployment Guide - Nilesh Creation Photography

## 🚀 Live Deployment Steps

This guide will deploy your MERN app to Railway with a live URL in ~15 minutes.

### Prerequisites
- GitHub account (you have this ✅)
- Railway account (free at railway.app)
- MongoDB Atlas account (free at mongodb.com)

---

## Step 1: Create MongoDB Atlas Database (2 min)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign up" and create a free account
3. Create a new project called "Nilesh Creation"
4. Select "M0 Sandbox" (free tier)
5. Create a cluster
6. Go to Database Access → Add New Database User
   - Username: `nilesh_admin`
   - Password: Create a strong password (copy this!)
7. Go to Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
8. Go to Clusters → Connect → Drivers
   - Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/nilesh-creation`
   - Replace `<username>` and `<password>` with your credentials

---

## Step 2: Set Up GitHub Repository (3 min)

1. Go to https://github.com/new
2. Create repo: `nilesh-creation`
3. Clone it locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nilesh-creation.git
   cd nilesh-creation
   ```
4. Copy all your project files into this folder
5. Create `.gitignore` (see below)
6. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit: MERN photography app"
   git push -u origin main
   ```

### .gitignore template:
```
node_modules/
.env
.env.local
.DS_Store
dist/
build/
```

---

## Step 3: Deploy Backend to Railway (5 min)

1. Go to https://railway.app
2. Sign up with GitHub (authorize)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `nilesh-creation` repo
5. Railway will auto-detect it's a Node.js project
6. Create a PostgreSQL or MongoDB plugin:
   - In Railway dashboard, click "Add" → "MongoDB"
   - This creates a cloud MongoDB instance
7. Set environment variables in Railway:
   - Click your project → Variables tab
   - Add:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/nilesh-creation
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     ```
8. Railway will auto-deploy when you push to GitHub

**Your Backend URL will be something like:** `https://nilesh-creation-prod.railway.app`

---

## Step 4: Deploy Frontend to Vercel (3 min)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project" and select your `nilesh-creation` repo
4. Framework preset: Select "Vite"
5. Root directory: `client`
6. Set Environment Variables:
   - `VITE_API_URL=https://nilesh-creation-prod.railway.app/api`
7. Click "Deploy"

**Your Frontend URL will be:** `https://your-frontend-name.vercel.app`

---

## Step 5: Final Setup

1. Update your Railway backend `FRONTEND_URL` to your Vercel URL
2. Update your Vercel `VITE_API_URL` to your Railway backend URL
3. Both platforms will redeploy automatically

---

## 🎉 Live Links

- **Frontend:** https://your-frontend-name.vercel.app
- **Backend API:** https://nilesh-creation-prod.railway.app/api
- **Admin Dashboard:** https://your-frontend-name.vercel.app/admin

---

## Troubleshooting

**"Cannot connect to MongoDB"**
- Check MONGODB_URI in Railway variables
- Verify IP whitelist in MongoDB Atlas (0.0.0.0/0)

**"Frontend shows white screen"**
- Verify VITE_API_URL environment variable in Vercel
- Check browser console for CORS errors

**"Services not loading"**
- Make sure backend deployed successfully
- Check Railway logs for errors

---

## Next Steps (Optional)

- Add custom domain (Railway & Vercel support this)
- Set up GitHub Actions for auto-deployment
- Add monitoring/error tracking (Sentry)
- Configure email notifications (Nodemailer with SendGrid)

