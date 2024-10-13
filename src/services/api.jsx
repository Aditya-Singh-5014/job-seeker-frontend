// frontend/src/services/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure this is correct based on your backend server
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { token } = JSON.parse(storedAuth);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle specific error statuses here
    return Promise.reject(error);
  }
);

export default api;
