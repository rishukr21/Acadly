import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB, closeDB } from './config/db.js';

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Start HTTP Server
    const server = app.listen(ENV.PORT, () => {
      console.log(`
🚀 ===============================================
   ACADLY BACKEND API SERVER RUNNING
   Environment : ${ENV.NODE_ENV}
   Port        : ${ENV.PORT}
   Base URL    : http://localhost:${ENV.PORT}
   Health      : http://localhost:${ENV.PORT}/api/health
   Client URL  : ${ENV.CLIENT_URL}
=================================================
      `);
    });

    // Graceful Shutdown
    const gracefulShutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        console.log('HTTP server closed.');
        await closeDB();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('Fatal Server Initialization Error:', error);
    process.exit(1);
  }
};

startServer();
