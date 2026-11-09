import express from 'express';
import mongoose from 'mongoose';
import { ENV } from '../config/env.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const isHealthy = dbState === 1;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: ENV.NODE_ENV,
    server: 'Acadly API Service',
    database: {
      status: states[dbState] || 'unknown',
      name: mongoose.connection.name || 'none',
      host: mongoose.connection.host || 'none',
    },
  });
});

export default router;
