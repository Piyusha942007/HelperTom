import axios from 'axios';

// Base URL for the FastAPI RAG engine, falling back to 127.0.0.1 if the .env isn't loaded
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Dynamic hot-fix for Windows environments: force IPv4 to avoid IPv6 connection refusals
if (API_BASE_URL.includes('localhost:8000')) {
  API_BASE_URL = API_BASE_URL.replace('localhost:8000', '127.0.0.1:8000');
}

// Base URL for the Express.js auth server
const AUTH_BASE_URL = 'http://127.0.0.1:5000/api';

// Axios instance for AI Chat and Ingestion (FastAPI)
export const aiApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for OTP Registration and Session Routing (Express.js)
export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT tokens into Auth headers if they exist in sessionStorage
authApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
