# Nilesh Creation - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Start MongoDB

Make sure MongoDB is running on your local machine or update the connection string in `server/.env`

### Step 3: Run the Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Backend running on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
✅ Frontend running on `http://localhost:3000`

---

## 📋 Default Admin Credentials

```
Email: admin@nileshcreation.com
Password: admin123
```

Change these in `server/.env` if needed.

---

## 🗂️ Project Files Overview

### Frontend (`client/src/`)
- **components/** - Navbar, Footer
- **pages/** - Home, About, Services, Portfolio, Contact, AdminDashboard
- **context/** - AuthContext for authentication
- **index.css** - Tailwind styles

### Backend (`server/`)
- **models/** - MongoDB schemas
- **routes/** - API endpoints
- **controllers/** - Business logic
- **middleware/** - Authentication

---

## 🎨 Color Scheme

| Color | Value | Usage |
|-------|-------|-------|
| Primary | #1a1a1a | Background, Text |
| Secondary | #ffffff | White spaces |
| Accent | #d4af37 | Highlights, Buttons |
| Light Gray | #f5f5f5 | Section backgrounds |

---

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

All pages are fully responsive!

---

## 🔐 Admin Dashboard

1. Navigate to `http://localhost:3000/admin`
2. Login with provided credentials
3. Manage:
   - Services (Add/Edit/Delete)
   - Portfolio (Add/Edit/Delete)
   - Contact Messages (View/Delete)

---

## 📸 Adding Sample Data

Use Postman or Insomnia to test APIs:

### Add a Service
```bash
POST http://localhost:5000/api/services
Authorization: Bearer YOUR_TOKEN

{
  "name": "Wedding Photography",
  "description": "Professional wedding photography services",
  "price": 50000,
  "image": "https://example.com/image.jpg",
  "category": "Weddings",
  "features": ["Full day coverage", "Editing included", "Albums"],
  "deliveryTime": "30 days"
}
```

### Add Portfolio Item
```bash
POST http://localhost:5000/api/portfolio
Authorization: Bearer YOUR_TOKEN

{
  "title": "Smith Wedding",
  "description": "Beautiful wedding at the beach",
  "images": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
  "category": "Weddings",
  "clientName": "Smith Family",
  "featured": true
}
```

---

## ✅ Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads on port 3000
- [ ] Admin login works
- [ ] Can add service
- [ ] Can add portfolio item
- [ ] Contact form works
- [ ] Mobile menu works
- [ ] All pages load properly

---

## 🛠️ Common Issues

### MongoDB Connection Error
```
Solution: Make sure MongoDB is running or update MONGODB_URI in server/.env
```

### Port 5000 Already in Use
```
Solution: Change PORT in server/.env or kill the process using that port
```

### Port 3000 Already in Use
```
Solution: The dev server will prompt you to use a different port
```

### CORS Error
```
Solution: Both servers must be running on specified ports
```

---

## 📚 Next Steps

1. Add your own images using external URLs
2. Customize the content in the database
3. Update contact information in Footer component
4. Deploy to production
5. Set up proper error handling for production

---

## 🌐 Deployment

**Backend:** Heroku, Railway, AWS Lambda
**Frontend:** Vercel, Netlify, AWS S3 + CloudFront

Update API URLs before deploying!

---

## 📞 Support

For questions or issues, refer to the main README.md file.

Happy coding! 🎉
