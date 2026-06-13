import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import servicesRoutes from './routes/services.js';
import portfolioRoutes from './routes/portfolio.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import Service from './models/Service.js';
import Portfolio from './models/Portfolio.js';

dotenv.config();

const app = express();
const DEFAULT_PORT = 5000;
const MAX_PORT_TRIES = 5;
const initialPort = Number(process.env.PORT) || DEFAULT_PORT;

app.use(cors());
app.use(express.json());

const seedDemoData = async () => {
  try {
    const serviceCount = await Service.countDocuments();
    const portfolioCount = await Portfolio.countDocuments();

    if (serviceCount === 0) {
      await Service.insertMany([
        {
          name: 'Wedding Photography',
          description: 'Capture your special wedding day with cinematic storytelling, beautiful portraits, and candid moments.',
          price: 35000,
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          category: 'Weddings',
          features: ['Full-day coverage (8 hours)', 'Pre-wedding shoot', 'High-resolution edited images', 'Custom wedding album', 'Same-day highlights reel'],
          deliveryTime: '4 weeks',
        },
        {
          name: 'Birthday Party Photography',
          description: 'Professional documentation of your birthday celebration with fun candid shots, group photos, and memorable moments.',
          price: 12000,
          image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
          category: 'Events',
          features: ['4-6 hours coverage', 'Unlimited candids', 'Group photographs', 'Cake cutting moments', 'Online gallery link'],
          deliveryTime: '2 weeks',
        },
        {
          name: 'Opening Reel - Cinematic Video',
          description: 'Professional cinematic opening reels for product launches, business openings, and promotional videos with stunning visuals.',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
          category: 'Video',
          features: ['4K cinematic footage', 'Professional drone shots', 'Color grading included', '60-90 second reel', 'Music & sound design'],
          deliveryTime: '3 weeks',
        },
        {
          name: 'Pre-Wedding Shoot',
          description: 'Beautiful pre-wedding photoshoot capturing your love story in scenic locations with romantic chemistry.',
          price: 18000,
          image: 'https://images.unsplash.com/photo-1530268729831-4be0ea6c9602?auto=format&fit=crop&w=1200&q=80',
          category: 'Weddings',
          features: ['2 scenic locations', 'Professional styling guide', '500+ edited photos', 'Cinematic video highlights', 'Album + digital copy'],
          deliveryTime: '3 weeks',
        },
        {
          name: 'Corporate Event Photography',
          description: 'Professional coverage for conferences, seminars, award ceremonies, and corporate functions.',
          price: 22000,
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
          category: 'Corporate',
          features: ['Full event coverage', 'Multiple photographers', 'Award moments capture', 'Group photographs', 'Fast turnaround delivery'],
          deliveryTime: '1 week',
        },
        {
          name: 'Family Portraits & Headshots',
          description: 'Professional family photoshoot and individual headshots in studio or outdoor settings with premium retouching.',
          price: 8000,
          image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
          category: 'Portraits',
          features: ['Studio lighting setup', 'Multiple outfit changes', 'Professional retouching', 'Digital & printed copies', 'Lifestyle outdoor shots'],
          deliveryTime: '2 weeks',
        },
      ]);
      console.log('Seeded demo services');
    }

    if (portfolioCount === 0) {
      await Portfolio.insertMany([
        {
          title: 'Raj & Priya - Wedding Celebration',
          description: 'A stunning wedding capturing traditions, emotions, and love with beautiful golden hour shots and candid family moments.',
          images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
          ],
          category: 'Weddings',
          clientName: 'Raj & Priya',
          projectDate: '2024-11-15',
          featured: true,
        },
        {
          title: 'Arjun\'s 5th Birthday Party',
          description: 'A joyful birthday celebration filled with fun activities, cake cutting, and unforgettable memories with family.',
          images: [
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1509027923473-86df99208174?auto=format&fit=crop&w=1200&q=80',
          ],
          category: 'Events',
          clientName: 'The Sharma Family',
          projectDate: '2024-10-22',
          featured: true,
        },
        {
          title: 'TechStart - Opening Reel',
          description: 'Cinematic opening reel for TechStart India\'s product launch with drone shots, office walkthrough, and team highlights.',
          images: [
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
          ],
          category: 'Corporate',
          clientName: 'TechStart India',
          projectDate: '2024-09-30',
          featured: true,
        },
        {
          title: 'Ananya & Vikram - Pre-Wedding',
          description: 'Romantic pre-wedding shoot capturing beautiful chemistry and love story at scenic heritage locations.',
          images: [
            'https://images.unsplash.com/photo-1530268729831-4be0ea6c9602?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
          ],
          category: 'Weddings',
          clientName: 'Ananya & Vikram',
          projectDate: '2024-08-12',
          featured: false,
        },
        {
          title: 'Annual Tech Conference 2024',
          description: 'Professional coverage of the annual tech conference with keynote speakers, networking sessions, and award presentations.',
          images: [
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
          ],
          category: 'Corporate',
          clientName: 'Global Tech Events',
          projectDate: '2024-07-20',
          featured: false,
        },
        {
          title: 'Singh Family Portraits',
          description: 'Warm family portrait session with parents and children in natural outdoor settings with professional lighting.',
          images: [
            'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
          ],
          category: 'Portraits',
          clientName: 'The Singh Family',
          projectDate: '2024-06-10',
          featured: false,
        },
      ]);
      console.log('Seeded demo portfolio items');
    }
  } catch (error) {
    console.error('Demo seed error:', error);
  }
};

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nilesh-creation')
  .then(async () => {
    console.log('MongoDB connected');
    await seedDemoData();
  })
  .catch((err) => console.log('MongoDB error:', err));

app.use('/api/services', servicesRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

const startServer = (portToTry, attemptsLeft) => {
  const server = app.listen(portToTry, () => {
    console.log(`Server running on port ${portToTry}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      const nextPort = portToTry + 1;
      console.warn(`Port ${portToTry} already in use. Trying port ${nextPort}...`);
      startServer(nextPort, attemptsLeft - 1);
    } else {
      console.error('Server failed to start:', err);
      process.exit(1);
    }
  });
};

startServer(initialPort, MAX_PORT_TRIES);
