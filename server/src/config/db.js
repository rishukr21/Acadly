import mongoose from 'mongoose';
import { ENV } from './env.js';

let mongodInstance = null;

export const connectDB = async () => {
  try {
    let mongoUri = ENV.MONGODB_URI;

    if (!mongoUri || mongoUri.trim() === '') {
      console.log('⚡ [DB] No MONGODB_URI detected in .env. Initializing in-memory MongoDB for local development...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      mongoUri = mongodInstance.getUri();
      console.log(`⚡ [DB] In-Memory MongoDB running at: ${mongoUri}`);
    }

    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true,
    });

    console.log(`✅ [DB] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ [DB] Error connecting to MongoDB: ${error.message}`);
    // If external URI failed in development, try falling back to memory server
    if (ENV.NODE_ENV === 'development' && !mongodInstance) {
      try {
        console.log('⚡ [DB] Retrying with local in-memory MongoDB fallback...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        mongodInstance = await MongoMemoryServer.create();
        const fallbackUri = mongodInstance.getUri();
        const conn = await mongoose.connect(fallbackUri);
        console.log(`✅ [DB] Fallback In-Memory MongoDB Connected at: ${fallbackUri}`);
        return conn;
      } catch (memErr) {
        console.error(`❌ [DB] Fallback failed: ${memErr.message}`);
        process.exit(1);
      }
    }
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
  } catch (error) {
    console.error('Error closing DB:', error);
  }
};
