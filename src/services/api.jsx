// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const pathname = window.location.pathname;

    if (pathname.startsWith('/recruiter')) {
      // Recruiter routes
      const storedRecruiterAuth = localStorage.getItem('recruiterAuth');
      if (storedRecruiterAuth) {
        const { token } = JSON.parse(storedRecruiterAuth);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } else {
      // Job Seeker routes
      const storedJobSeekerAuth = localStorage.getItem('auth');
      if (storedJobSeekerAuth) {
        const { token } = JSON.parse(storedJobSeekerAuth);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
