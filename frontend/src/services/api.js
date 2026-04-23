import axios from 'axios';

// GitHub Pages serves the frontend from a static CDN, so the backend must be deployed separately.
// Set VITE_API_URL in your GitHub repository secrets (for CI builds) or in a local .env file.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Needed for sending/receiving HTTP-Only Cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
