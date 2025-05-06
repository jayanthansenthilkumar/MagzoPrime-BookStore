import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Use the consistent key 'bookstore-current-user' for auth
    const userJSON = localStorage.getItem('bookstore-current-user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = 
      error.response?.data?.message || 
      error.message || 
      'An unexpected error occurred';
    
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default api;