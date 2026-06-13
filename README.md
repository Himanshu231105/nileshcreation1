# Nilesh Creation - Photography Website

A modern, fully responsive photography portfolio website built with React, Node.js, Express, MongoDB, and Tailwind CSS. Features a professional black, white, and gold theme with an admin dashboard for managing content.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Professional black, white, and gold color scheme
- **Service Management**: Showcase photography services with pricing
- **Portfolio Gallery**: Display photography portfolio with lightbox feature
- **Contact System**: Integrated contact form with message storage
- **Admin Dashboard**: Secure admin interface to manage services, portfolio, and messages
- **Authentication**: JWT-based authentication for admin access
- **Fast Performance**: Optimized with Vite for rapid development

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Vite
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Nodemailer for emails

## Project Structure

```
agrishstr/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Auth context
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Express backend
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    ├── controllers/        # Route controllers
    ├── middleware/         # Auth middleware
    ├── server.js
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nilesh-creation
JWT_SECRET=your_super_secret_jwt_key_change_in_production
ADMIN_EMAIL=admin@nileshcreation.com
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will open on `http://localhost:3000`

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (requires auth)
- `PUT /api/services/:id` - Update service (requires auth)
- `DELETE /api/services/:id` - Delete service (requires auth)

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/featured/all` - Get featured portfolio items
- `GET /api/portfolio/:id` - Get portfolio item by ID
- `POST /api/portfolio` - Create portfolio item (requires auth)
- `PUT /api/portfolio/:id` - Update portfolio item (requires auth)
- `DELETE /api/portfolio/:id` - Delete portfolio item (requires auth)

### Contact
- `GET /api/contact` - Get all messages (requires auth)
- `GET /api/contact/:id` - Get message by ID (requires auth)
- `POST /api/contact` - Create contact message
- `DELETE /api/contact/:id` - Delete message (requires auth)

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration
- `GET /api/admin/profile` - Get admin profile (requires auth)

## Pages

### Public Pages
1. **Home** - Hero section, featured works, featured services, CTA
2. **About** - About photographer, stats, expertise areas
3. **Services** - Complete service catalog with pricing
4. **Portfolio** - Photography gallery with lightbox
5. **Contact** - Contact form and contact information

### Admin Pages
6. **Admin Dashboard** - Manage services, portfolio, and view messages

## Admin Credentials

Default admin credentials (change in production):
- Email: `admin@nileshcreation.com`
- Password: `admin123`

## Features Detail

### Responsive Design
All pages are fully responsive and optimized for:
- Mobile phones (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

### Admin Dashboard Features
- Add/edit/delete services
- Add/edit/delete portfolio items
- View and manage contact messages
- Mark messages as read/unread
- JWT token-based authentication

### Color Scheme
- Primary: #1a1a1a (Black)
- Secondary: #ffffff (White)
- Accent: #d4af37 (Gold)
- Light Gray: #f5f5f5

## Installation Using Placeholder Images

The project includes placeholder images from Unsplash. To add your own images:

1. Replace image URLs in the database
2. Use external URLs (Cloudinary, Imgur, etc.)
3. Or implement file upload functionality

## Production Deployment

### Backend
1. Change JWT_SECRET to a strong random string
2. Update MONGODB_URI for production database
3. Set NODE_ENV to production
4. Deploy to services like Heroku, Railway, or AWS

### Frontend
1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to static hosting (Vercel, Netlify, AWS S3, etc.)
3. Update VITE_API_URL to production API URL

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update MONGODB_URI
- Check connection string format

### Port Already in Use
- Change PORT in server/.env
- Or kill the process using the port

### CORS Errors
- Ensure both client and server are running
- Update API URLs if deployed

## Future Enhancements

- Email notifications for contact forms
- Payment integration
- Social media integration
- SEO optimization
- Image optimization and CDN integration
- Blog functionality
- Analytics dashboard

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, feel free to reach out or open an issue in the repository.
