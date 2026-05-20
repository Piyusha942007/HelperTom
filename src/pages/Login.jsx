import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '../App'; // Consumes your global Context to update the UI layouts dynamically

export default function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loginRole, setLoginRole] = useState('user');
  const [isSignupMode, setIsSignupMode] = useState(false); // Sign up vs Log in for standard users
  const [step, setStep] = useState(1); // Step 1: Request OTP / Sign Up, Step 2: Verify OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailStatusMismatch, setEmailStatusMismatch] = useState(null); // 'not_registered' or 'already_registered'
  
  const navigate = useNavigate();
  const { setRole } = useRole(); // Hook to set the role ('user' or 'admin') globally

  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    const token = sessionStorage.getItem('token');
    if (storedRole && token) {
      navigate(storedRole === 'admin' ? '/admin/dashboard' : '/', { replace: true });
    }
  }, [navigate]);

  // Ensure signup mode and status mismatches are reset if role switches
  const handleRoleChange = (role) => {
    setLoginRole(role);
    setIsSignupMode(false);
    setError('');
    setSuccessMessage('');
    setEmailStatusMismatch(null);
  };

  // Handle Standard User Registration
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setEmailStatusMismatch(null);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, role: loginRole });
      setSuccessMessage(response.data.message || 'Sign up successful! Please request a code to log in.');
      setIsSignupMode(false); // Switch back to login form tab on success
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('go to login')) {
        setEmailStatusMismatch('already_registered');
      } else {
        setError(msg || 'Failed to sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Send request to backend to dispatch OTP email via Nodemailer
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setEmailStatusMismatch(null);
    try {
      await axios.post('http://localhost:5000/api/auth/request-otp', { email, role: loginRole });
      setStep(2); // Move to the OTP verification screen on success
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (msg.toLowerCase().includes('not registered') || msg.toLowerCase().includes('sign up first')) {
        setEmailStatusMismatch('not_registered');
      } else {
        setError(msg || 'Failed to send OTP. Please check your network or email.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit OTP code for cryptographic verification and session routing
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp, role: loginRole });
      
      const { token, role } = response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('userEmail', email);

      setRole(role);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP code. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamic aesthetic styles based on active login type (Light Mode)
  const isUserTheme = loginRole === 'user';
  
  // Custom HSL gradients and glows mapped to dashboard schemes (Light Mode compatible)
  const glow1 = isUserTheme ? 'bg-emerald-200/25' : 'bg-purple-200/25';
  const glow2 = isUserTheme ? 'bg-teal-200/25' : 'bg-blue-200/25';
  
  const textGrad = isUserTheme 
    ? 'from-emerald-700 via-teal-600 to-emerald-800' 
    : 'from-purple-700 via-blue-600 to-indigo-800';
    
  const btnGrad = isUserTheme 
    ? 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/10' 
    : 'from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-600/10';
    
  const inputBorder = isUserTheme 
    ? 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30' 
    : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans text-slate-800 select-none relative overflow-hidden transition-all duration-700">
      {/* Background Ambient Tech Glows - Seamless Transitions */}
      <div className={`absolute top-1/4 left-1/4 w-80 h-80 ${glow1} rounded-full blur-[120px] pointer-events-none transition-all duration-700`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${glow2} rounded-full blur-[120px] pointer-events-none transition-all duration-700`}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-100/50 z-10"
      >
        {/* Dynamic Typography Gradient */}
        <h2 className={`text-3xl font-extrabold text-center bg-gradient-to-r ${textGrad} bg-clip-text text-transparent tracking-tight mb-2 transition-all duration-700`}>
          Welcome to HelperTom
        </h2>
        
        <p className="text-slate-500 text-center text-sm mb-6 px-4">
          {step === 1 ? (
            isSignupMode 
              ? 'Enter your details below to register your account.'
              : 'Choose a login type and request a one-time verification code.'
          ) : (
            <span>
              Enter the 6-digit code,{' '}
              <span className={`font-semibold ${isUserTheme ? 'text-emerald-600' : 'text-blue-600'}`}>
                as we are sending the OTP in the email
              </span>.
            </span>
          )}
        </p>

        {step === 1 && (
          <div className="mb-6">
            {/* Dynamic Buttons matching dashboard styling */}
            <div className="flex gap-3 justify-center mb-3">
              <button
                type="button"
                onClick={() => handleRoleChange('user')}
                className={`flex-1 px-4 py-2.5 rounded-2xl border text-sm transition duration-300 ${isUserTheme
                  ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-md shadow-emerald-600/10'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'}`}
              >
                User Portal
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex-1 px-4 py-2.5 rounded-2xl border text-sm transition duration-300 ${!isUserTheme
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-md shadow-blue-600/10'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'}`}
              >
                Admin Portal
              </button>
            </div>
            
            {/* Dynamic description footer */}
            <p className="text-xs text-center text-slate-400 px-2 mt-3">
              {loginRole === 'admin'
                ? 'Admin login requires a pre-registered admin email address.'
                : 'Users can register an account or request a verification code to access their dashboard.'}
            </p>

            {/* Sign In / Sign Up Tabs */}
              <div className="flex justify-center border-b border-slate-200 mt-5">
                <button
                  type="button"
                  onClick={() => { setIsSignupMode(false); setError(''); setSuccessMessage(''); setEmailStatusMismatch(null); }}
                  className={`flex-1 pb-2.5 text-sm font-medium transition duration-300 ${!isSignupMode 
                    ? 'text-emerald-600 border-b-2 border-emerald-600 font-semibold' 
                    : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSignupMode(true); setError(''); setSuccessMessage(''); setEmailStatusMismatch(null); }}
                  className={`flex-1 pb-2.5 text-sm font-medium transition duration-300 ${isSignupMode 
                    ? 'text-emerald-600 border-b-2 border-emerald-600 font-semibold' 
                    : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Sign Up
                </button>
              </div>
          </div>
        )}

        {/* Smart Registration Status Mismatch Notices */}
        <AnimatePresence mode="wait">
          {emailStatusMismatch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 overflow-hidden"
            >
              {emailStatusMismatch === 'not_registered' ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex flex-col gap-3">
                  <div className="font-medium text-amber-900 leading-snug">
                    This email is not registered yet. Standard users must sign up first.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignupMode(true);
                      setEmailStatusMismatch(null);
                      setError('');
                      setSuccessMessage('');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition-colors shadow-sm text-center"
                  >
                    Sign Up with this Email Now
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-sm flex flex-col gap-3">
                  <div className="font-medium text-blue-900 leading-snug">
                    This email is already registered. You can log in directly.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignupMode(false);
                      setEmailStatusMismatch(null);
                      setError('');
                      setSuccessMessage('');
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-white text-xs font-semibold transition-colors shadow-sm text-center ${
                      isUserTheme ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'
                    }`}
                  >
                    Switch to Log In Tab
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback alerts with Framer Motion transitions */}
        <AnimatePresence mode="wait">
          {error && !emailStatusMismatch && (
            <motion.div 
              key="error-alert"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}
          
          {successMessage && !emailStatusMismatch && (
            <motion.div 
              key="success-alert"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm text-center font-medium"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {step === 1 ? (
          isSignupMode ? (
            /* Signup Form Flow */
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sign Up Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none transition-all text-slate-900 placeholder-slate-400 shadow-sm ${inputBorder}`}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${btnGrad} font-semibold text-white transition-all duration-200 shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none`}
              >
                {loading ? 'Creating Account...' : 'Register Account'}
              </button>
            </form>
          ) : (
            /* OTP Request Form Flow */
            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none transition-all text-slate-900 placeholder-slate-400 shadow-sm ${inputBorder}`}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${btnGrad} font-semibold text-white transition-all duration-200 shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none`}
              >
                {loading ? 'Sending Security Code...' : 'Send Verification Code'}
              </button>
            </form>
          )
        ) : (
          /* OTP Verification Form Flow */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">One-Time Security Code</label>
              <input
                type="text"
                maxLength="6"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-2xl tracking-[0.5em] font-mono focus:bg-white focus:outline-none transition-all text-slate-900 placeholder-slate-300 shadow-sm ${inputBorder}`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r ${btnGrad} font-semibold text-white transition-all duration-200 shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none`}
            >
              {loading ? 'Verifying Credentials...' : 'Verify & Access Dashboard'}
            </button>
            <button
              type="button"
              onClick={() => { setStep(1); setError(''); setSuccessMessage(''); setEmailStatusMismatch(null); }}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors pt-2 tracking-wide font-medium"
            >
              ← Modify Sign-In Email
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}