#!/bin/bash

# Quick Deployment Setup Script
# This script prepares your project for deployment to Railway and Vercel

echo "🚀 Nilesh Creation - Deployment Setup"
echo "======================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: MERN photography app"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Pre-Deployment Checklist:"
echo "======================================"
echo ""
echo "✓ Frontend: client/"
echo "  - React 18.2.0 with Vite"
echo "  - Services page with cart functionality"
echo "  - Build command: npm run build"
echo ""
echo "✓ Backend: server/"
echo "  - Express.js with MongoDB"
echo "  - Demo data seeding enabled"
echo "  - Start command: npm start"
echo ""
echo "✓ Database: MongoDB Atlas (free tier)"
echo "  - Create account: https://mongodb.com/cloud/atlas"
echo ""
echo "📝 Next Steps:"
echo "======================================"
echo ""
echo "1️⃣ Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/nilesh-creation.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2️⃣ Deploy Backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub repo"
echo "   - Add MongoDB plugin"
echo "   - Set MONGODB_URI environment variable"
echo ""
echo "3️⃣ Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import GitHub repo"
echo "   - Set VITE_API_URL to Railway backend URL"
echo "   - Root directory: client"
echo ""
echo "4️⃣ Configure CORS:"
echo "   - Update backend FRONTEND_URL in Railway"
echo "   - Update frontend VITE_API_URL in Vercel"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "✨ Deployment Ready!"
