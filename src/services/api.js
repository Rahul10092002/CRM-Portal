import axios from 'axios';

// Flag to toggle between mock and real APIs
export const USE_MOCK_API = true;

// Base API URL - replace with your actual API URL when ready
export const API_URL = 'https://api.example.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response for debugging
    console.log(`API Response: ${response.status} ${response.config.url}`);
    
    return response;
  },
  (error) => {
    // Handle errors
    console.error('API Error:', error);
    
    return Promise.reject(error);
  }
);

// Helper function to simulate API latency
export const simulateLatency = (min = 200, max = 800) => {
  const latency = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, latency));
};

export default api;
