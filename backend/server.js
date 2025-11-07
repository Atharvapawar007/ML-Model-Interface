/**
 * Express server for Student Performance Analytics API
 * Main entry point for the backend application
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './src/db.js';
import previewRouter from './src/routes/preview.js';
import rowsRouter from './src/routes/rows.js';
import analyticsRouter from './src/routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/preview', previewRouter);
app.use('/api/rows', rowsRouter);
app.use('/api/analytics', analyticsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
async function startServer() {
  // Test database connection
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.warn('⚠️  Warning: Database connection failed. Server will start but API may not work.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  });
}

startServer().catch(console.error);

