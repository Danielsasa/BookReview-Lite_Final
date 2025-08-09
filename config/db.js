import mongose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodbUri = process.env.mongodb_uri 

const conectDB = async () => { 
  try {
    await mongose.connect(mongodbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

export default conectDB;
