import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Added Mongoose connection instance
import { requestOtp, verifyOtp, signupUser } from './controllers/authController.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment configurations relative to server.js
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Establish Cloud Database Connection Link
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 Successfully connected to MongoDB Database!'))
  .catch((err) => console.error('❌ MongoDB Connection Failure Error:', err));

// API Routing Endpoints
app.post('/api/auth/request-otp', requestOtp);
app.post('/api/auth/verify-otp', verifyOtp);
app.post('/api/auth/signup', signupUser);

// Start Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running smoothly on port ${PORT}`);
});