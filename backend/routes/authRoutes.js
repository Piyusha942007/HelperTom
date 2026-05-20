import express from 'express';
import { requestOtp, verifyOtp, signupUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/signup', signupUser);

export default router;
