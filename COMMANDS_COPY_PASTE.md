# 🔧 Command Reference - Copy & Paste Ready

## Step 1: Push to GitHub

### 1a. Create GitHub Repo
- Go to: https://github.com/new
- Name: `nilesh-creation`
- Click "Create repository"

### 1b. Push Your Code
Run these commands in your project folder:

```powershell
# Open project folder
cd "c:\Users\asus\OneDrive\Desktop\agrishstr"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MERN photography app with cart, orders, and 6 demo services"

# Rename branch to main
git branch -M main

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nilesh-creation.git

# Push to GitHub
git push -u origin main
```

✅ **Result:** Your code is now on GitHub!

---

## Step 2: MongoDB Atlas Setup

### 2a. Create MongoDB Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Sign up"
3. Create account with email

### 2b. Create Database
1. Click "Create a Deployment"
2. Choose "M0 Sandbox" (FREE)
3. Provider: AWS
4. Region: Choose closest to you
5. Click "Create"
6. Wait 1-2 minutes for cluster creation

### 2c. Create Database User
1. Left menu → "Database Access"
2. Click "Add New Database User"
3. Authentication: "Password"
4. Username: `nilesh_admin`
5. Password: Create strong password (save this!)
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### 2d. Allow Network Access
1. Left menu → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 2e. Get Connection String
1. Click "Clusters" → Your Cluster → "Connect"
2. Choose "Drivers" (Node.js)
3. Copy the connection string:
   ```
   mongodb+srv://nilesh_admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/nilesh-creation?retryWrites=true&w=majority
   ```
4. Replace `<PASSWORD>` with your actual password
5. Example:
   ```
   mongodb+srv://nilesh_admin:MySecurePass123@cluster0.abc123.mongodb.net/nilesh-creation?retryWrites=true&w=majority
   ```

✅ **Save this connection string! You'll need it in Step 3.**

---

## Step 3: Deploy Backend on Railway

### 3a. Create Railway Account
1. Go to: https://railway.app
2. Click "Create Account"
3. Sign up with GitHub (authorize Railway)

### 3b. Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Find and select `nilesh-creation`
4. Click "Deploy"
5. Railway auto-detects Node.js
6. Wait for build (shows "Building..." then "Deployment...")

### 3c. Set Environment Variables
1. Click your project
2. Click "Variables" tab
3. Add these variables (click "Add Variable" for each):

| Name | Value |
|------|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Paste your MongoDB connection string from Step 2 |
| `FRONTEND_URL` | Leave blank for now, update in Step 5 |

Example for MONGODB_URI:
```
mongodb+srv://nilesh_admin:MySecurePass123@cluster0.abc123.mongodb.net/nilesh-creation?retryWrites=true&w=majority
```

4. Click "Save changes"
5. Railway auto-redeploys

### 3d. Get Your Backend URL
1. Click "Deployments" tab
2. Look for "Service URL"
3. Copy the URL (looks like: `https://nilesh-creation-prod-xxx.railway.app`)

✅ **Save this URL! You'll need it in Step 4.**

---

## Step 4: Deploy Frontend on Vercel

### 4a. Create Vercel Account
1. Go to: https://vercel.com
2. Click "Sign up"
3. Sign up with GitHub (authorize Vercel)

### 4b. Import Project
1. Click "New Project"
2. Click "Import Git Repository"
3. Find and select `nilesh-creation`
4. Click "Import"

### 4c. Configure Deployment
1. **Framework:** Select "Vite"
2. **Root Directory:** Type `client` (very important!)
3. **Build Command:** Leave as default (vite build)
4. **Install Command:** Leave as default (npm install)

### 4d. Set Environment Variables
1. Scroll down to "Environment Variables"
2. Add:
   - Name: `VITE_API_URL`
   - Value: Paste your Railway backend URL from Step 3
   - Example: `https://nilesh-creation-prod-xxx.railway.app/api`

3. Click "Add"
4. Click "Deploy"

### 4e. Get Your Frontend URL
- Wait for deployment to complete
- Vercel shows your URL when done
- Usually: `https://nilesh-creation.vercel.app`

✅ **Save this URL!**

---

## Step 5: Link Frontend & Backend

### 5a. Update Railway with Vercel URL
1. Go back to: https://railway.app
2. Click your project
3. Click "Variables" tab
4. Find `FRONTEND_URL`
5. Set value to your Vercel URL: `https://nilesh-creation.vercel.app`
6. Click "Save"
7. Railway auto-redeploys

### 5b. Verify Vercel URL is Set
1. Go to: https://vercel.com
2. Click your project
3. Click "Settings" → "Environment Variables"
4. Verify `VITE_API_URL` is set to Railway URL

✅ **Both platforms now know about each other!**

---

## 🎊 You're Done! 

### Your Live Links:

**Frontend (Website):**
```
https://nilesh-creation.vercel.app
```

**Backend API:**
```
https://nilesh-creation-prod-xxx.railway.app
```

### Test Your App:

1. Open: https://nilesh-creation.vercel.app
2. Go to Services → Should show 6 services
3. Go to Portfolio → Should show 6 projects
4. Click on a service → Should show details
5. Add to Cart → Should add item
6. Go to My Cart → Should show cart items
7. Checkout → Should create order
8. My Orders → Should show order history

---

## 📝 Important Notes

### Auto-Deployment
- Every time you push to GitHub, both Railway and Vercel auto-deploy
- No manual deployment needed after this setup!

### How to Update Your App:
```powershell
# Make changes to your code
# Then run:
git add .
git commit -m "Update: Description of changes"
git push

# Railway & Vercel auto-deploy! ✨
```

### Troubleshooting Commands:

**If services not loading:**
1. Check Railway backend logs:
   - Railway Dashboard → Your Project → Deployments → View Logs
2. Check Vercel frontend logs:
   - Vercel Dashboard → Your Project → Deployments → View Logs

**If cart not working:**
- Open browser console (F12)
- Check for errors in Console tab
- Check Network tab for API calls

---

## 🎯 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created (nilesh_admin)
- [ ] Network access allowed (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Railway project created from GitHub
- [ ] Railway environment variables set
- [ ] Backend URL copied
- [ ] Vercel project created from GitHub
- [ ] Vercel environment variables set
- [ ] Frontend URL copied
- [ ] Railway FRONTEND_URL updated
- [ ] Both platforms deployed successfully
- [ ] App tested and working

---

## 💡 Pro Tips

✅ Bookmark your live URLs
✅ Share frontend URL with others
✅ Keep MongoDB connection string safe
✅ Railway free tier: 5 GB bandwidth/month
✅ Vercel free tier: unlimited bandwidth
✅ Can upgrade anytime if needed

---

**🚀 Your app is now LIVE! Share the URL: https://nilesh-creation.vercel.app**
