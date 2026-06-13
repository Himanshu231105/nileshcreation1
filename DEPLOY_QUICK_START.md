# 🚀 QUICK START: Deploy in 15 Minutes

## Your Live App Will Be:
- **Frontend:** https://nilesh-creation.vercel.app (or your-custom-name)
- **Backend API:** https://nilesh-creation-prod.railway.app (or custom)
- **Database:** MongoDB Atlas (cloud, free)

---

## ⏱️ STEP 1: Create GitHub Repository (2 min)

1. Go to **https://github.com/new**
2. Create repository:
   - Name: `nilesh-creation`
   - Description: "Professional Photography Website - MERN Stack"
   - Public
   - Click "Create repository"

3. Push your code (in your project folder):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MERN photography app with cart & orders"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nilesh-creation.git
   git push -u origin main
   ```

✅ Your code is now on GitHub!

---

## 🗄️ STEP 2: Set Up MongoDB Atlas (3 min)

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Create a free account"**
3. Complete signup with your email
4. Click **"Create"** under Deployment Options
5. Select **"M0 Sandbox"** (free tier) → Next
6. Provider: AWS, Region: closest to you → Create
7. Wait for cluster creation (1-2 min)

### Create Database User:
1. Left menu → **"Database Access"**
2. Click **"Add New Database User"**
3. Authentication method: **"Password"**
4. Username: `nilesh_admin`
5. Password: Copy a strong password
6. Click **"Create User"**

### Allow Network Access:
1. Left menu → **"Network Access"**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Confirm

### Get Connection String:
1. Click **"Clusters"** → Your cluster → **"Connect"**
2. Select **"Drivers"** (Node.js)
3. Copy the connection string:
   ```
   mongodb+srv://nilesh_admin:PASSWORD@cluster.mongodb.net/nilesh-creation?retryWrites=true&w=majority
   ```
   Replace `PASSWORD` with your actual password

✅ Database is ready!

---

## 🚂 STEP 3: Deploy Backend to Railway (5 min)

1. Go to **https://railway.app**
2. Click **"Dashboard"** or **"Start Project"**
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Authorize Railway with GitHub
5. Select your **`nilesh-creation`** repo
6. Railway auto-detects Node.js!
7. Wait for deployment (shows building...)

### Set Environment Variables:
1. In Railway, click your project
2. Click **"Variables"** tab
3. Add these variables:

| Name | Value |
|------|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://nilesh_admin:YOUR_PASSWORD@cluster.mongodb.net/nilesh-creation?retryWrites=true&w=majority` |
| `FRONTEND_URL` | `https://nilesh-creation.vercel.app` |

4. Click "Save changes"
5. Railway auto-redeploys

**Your backend URL:** 
- Go to Deployments tab
- Copy the **Service URL** (looks like: `https://nilesh-creation-prod-*.railway.app`)

✅ Backend is live!

---

## 🔗 STEP 4: Deploy Frontend to Vercel (3 min)

1. Go to **https://vercel.com**
2. Click **"New Project"**
3. Authorize Vercel with GitHub
4. Select **`nilesh-creation`** repo
5. Framework: Select **"Vite"**
6. Root Directory: Type **`client`**
7. Click **"Continue"**

### Set Environment Variables:
1. Click **"Environment Variables"**
2. Add:
   - Name: `VITE_API_URL`
   - Value: `https://YOUR_RAILWAY_URL/api` (from Step 3)
3. Click "Add"
4. Click **"Deploy"**

**Your frontend URL:** Vercel shows it when deployment finishes!

✅ Frontend is live!

---

## 🔄 STEP 5: Link Frontend & Backend (1 min)

1. Go back to **Railway**
2. Update `FRONTEND_URL` to your Vercel URL
3. Both platforms auto-redeploy

---

## ✨ DONE! Your Live Links:

### 🎊 Open These URLs:
```
Frontend:   https://nilesh-creation.vercel.app
Backend:    https://nilesh-creation-prod-*.railway.app
API:        https://nilesh-creation-prod-*.railway.app/api
```

### Test Your App:
- ✅ Open frontend URL
- ✅ Go to /services (should load 6 services from MongoDB)
- ✅ Go to /portfolio (should load 6 portfolio items)
- ✅ Try adding to cart
- ✅ Try checkout

---

## 🐛 Troubleshooting

**"Cannot connect to services"**
→ Check `VITE_API_URL` in Vercel settings
→ Make sure MongoDB connection string is correct in Railway

**"White screen on frontend"**
→ Check browser console for CORS errors
→ Verify `FRONTEND_URL` in Railway matches Vercel URL

**"MongoDB connection failed"**
→ Verify `MONGODB_URI` in Railway variables
→ Check IP whitelist is set to 0.0.0.0/0 in MongoDB Atlas

**"Services not loading"**
→ Check Railway logs (click project → view logs)
→ Make sure backend deployed successfully

---

## 💡 Pro Tips

✅ Every time you push to GitHub, both Railway and Vercel auto-redeploy
✅ You can add custom domains later (both Railway and Vercel support this)
✅ Database seeding happens automatically on first deployment
✅ Cart data is stored in browser localStorage

---

## 🎯 You Now Have:

- ✅ Live photography booking website
- ✅ Shopping cart with order history
- ✅ 6 unique demo services (Wedding, Birthday, Opening Reel, etc.)
- ✅ 6 portfolio projects with images
- ✅ Professional admin panel
- ✅ Auto-scaling backend
- ✅ Cloud database

**Share this URL with anyone:** 
```
https://nilesh-creation.vercel.app
```

🎉 **Congrats! Your app is LIVE!**
