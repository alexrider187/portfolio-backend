import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './src/middleware/errorHandler.js';

import contactRoutes from './src/routes/contactRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import projectRoutes from './src/routes/ProjectRoutes.js';

dotenv.config();

const app = express();

// Needed because we’re using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// ✅ CORS setup for only your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ✅ Helmet for security, allow images from your own backend
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", process.env.FRONTEND_URL, "http://localhost:5000"], // Only frontend + self
        connectSrc: ["'self'", process.env.FRONTEND_URL],
      },
    },
    crossOriginResourcePolicy: { policy: "same-site" }, // Prevent cross-origin resource blocks for your own site
  })
);

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// ✅ Serve uploaded images, allow only your frontend to request them
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); // Only your site
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);

// ✅ Routes
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// ✅ Error handler should come AFTER routes
app.use(errorHandler);

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('My portfolio backend is running... 🎉');
});

export default app;
