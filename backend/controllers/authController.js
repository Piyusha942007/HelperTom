import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; // Import our new MongoDB collection model

// Temporary in-memory stores for validation windows
let otpCache = {}; 

// Pre-approved list for dynamic system classification check
const PRE_APPROVED_ADMINS = [
  
  'teamspakonix@gamil.com'
];

const isAdminEmail = (email) => {
  const normalized = String(email).trim().toLowerCase();
  return normalized.startsWith('admin@') || PRE_APPROVED_ADMINS.includes(normalized);
};

// Transporter configuration using Nodemailer
const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Route 1: Generate and Send OTP
export const requestOtp = async (req, res) => {
  const { email, role } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Role must be user or admin.' });
  }
  
  const normalizedEmail = String(email).trim().toLowerCase();

  try {
    // 1. Look up user record inside MongoDB cluster
    const user = await User.findOne({ email: normalizedEmail });

    // 2. Validate existence and access role privileges 
    if (!user) {
      return res.status(400).json({ message: 'This email is not registered. Please sign up first.' });
    }
    if (role !== user.role) {
      return res.status(403).json({ message: `Access denied. This profile is registered under the role: ${user.role}.` });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ message: 'Email credentials not configured.' });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret not configured.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    otpCache[normalizedEmail] = {
      otp,
      role,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    const isUser = role === 'user';
    
    // Dynamic color styling matching UI style guide palettes
    const outerBg = isUser ? '#ECFDF5' : '#EFF6FF';
    const border = isUser ? '#A7F3D0' : '#BFDBFE';
    const titleColor = isUser ? '#047857' : '#1D4ED8';
    const codeBg = isUser ? '#F0FDF4' : '#F0F9FF';
    const codeBorder = isUser ? '#DCFCE7' : '#E0F2FE';
    const codeColor = isUser ? '#059669' : '#2563EB';

    const mailOptions = {
      from: `"HelperTom Security" <${process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: 'Your HelperTom Login Verification Code',
      html: `
        <div style="font-family: sans-serif; background-color: ${outerBg}; padding: 30px; border-radius: 16px; max-width: 480px; margin: 0 auto; border: 1px solid ${border}; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #f1f5f9;">
            <h2 style="color: ${titleColor}; margin-top: 0; margin-bottom: 16px; font-size: 20px; font-weight: bold;">HelperTom Verification Code</h2>
            <p style="color: #475569; font-size: 15px; line-height: 1.5; margin-bottom: 24px;">
              Use the security code below to access your dashboard. This code is valid for 5 minutes.
            </p>
            <div style="background-color: ${codeBg}; border: 1px solid ${codeBorder}; padding: 18px; text-align: center; border-radius: 10px; margin: 20px 0;">
              <span style="font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 6px; color: ${codeColor};">${otp}</span>
            </div>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; margin-bottom: 0;">
              If you did not request this login, please ignore this email securely.
            </p>
          </div>
        </div>
      `,
    };

    const transporter = getTransporter();
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully to email.' });

  } catch (error) {
    console.error('OTP Request Database Error:', error);
    res.status(500).json({ message: 'Internal server database error handling request.' });
  }
};

// Route 2: Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp, role } = req.body;
  const normalizedEmail = String(email).trim().toLowerCase();
  const record = otpCache[normalizedEmail];

  if (!record) return res.status(400).json({ message: 'No OTP requested for this email address.' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ message: 'OTP code has expired.' });
  if (record.role !== role) return res.status(400).json({ message: 'Role mismatch for this login attempt.' });
  if (record.otp !== otp) return res.status(400).json({ message: 'Incorrect verification code.' });

  delete otpCache[normalizedEmail];

  const token = jwt.sign({ email: normalizedEmail, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return res.status(200).json({
    message: 'Authentication successful',
    token,
    role
  });
};

// Route 3: Register standard User or Admin inside MongoDB Atlas
export const signupUser = async (req, res) => {
  const { email, role } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });
  
  const normalized = String(email).trim().toLowerCase();
  const targetRole = role && role === 'admin' ? 'admin' : 'user';

  try {
    // 1. Verify if user already exists inside our cluster database collection
    const existingUser = await User.findOne({ email: normalized });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered. Please go to Login.' });
    }

    // 2. Perform credential assignment checking
    if (targetRole === 'user' && isAdminEmail(normalized)) {
      return res.status(400).json({ message: 'Administrative email addresses cannot sign up as regular users.' });
    }
    if (targetRole === 'admin' && !isAdminEmail(normalized)) {
      return res.status(403).json({ message: 'This email is not authorized to register as an admin.' });
    }

    // 3. Create document record structure
    const newUser = new User({
      email: normalized,
      role: targetRole
    });

    await newUser.save(); // Pushes document row entry straight onto the cloud
    console.log(`✨ Registered successfully into Atlas collection: ${normalized} (${targetRole})`);

    return res.status(200).json({ message: `${targetRole === 'admin' ? 'Admin' : 'User'} signup successful! You can now request an OTP to log in.` });

  } catch (dbError) {
    console.error('Signup Operations Failure:', dbError);
    return res.status(500).json({ message: 'Internal cloud storage database operation failure.' });
  }
};