// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api"; // Use the Axios instance with interceptors

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    profile: null,
    lastAction: null, // 'login' or 'signup'
  });

  useEffect(() => {
    // Initialize auth state from localStorage
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // Function to handle login
  const loginUser = async (credentials) => {
    try {
      // Perform login
      const response = await api.post("/jobseeker/login", credentials);
      const { token, user } = response.data;

      // Store token and user in state and localStorage
      const newAuth = {
        isAuthenticated: true,
        user,
        token,
        profile: null, // Will be fetched next
        lastAction: "login",
      };

      setAuth(newAuth);
      localStorage.setItem("auth", JSON.stringify(newAuth));

      // Fetch user profile after storing the token
      const profileResponse = await api.get("/jobseeker/profile");
      const { profile } = profileResponse.data;

      // Update auth state with profile
      const updatedAuth = {
        ...newAuth,
        profile,
      };

      setAuth(updatedAuth);
      localStorage.setItem("auth", JSON.stringify(updatedAuth));
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  // Function to handle signup
  const signupUser = async (userData) => {
    try {
      // Perform signup
      const response = await api.post("/jobseeker/signup", userData);
      const { token, user } = response.data;

      // Store token and user in state and localStorage
      const newAuth = {
        isAuthenticated: true,
        user,
        token,
        profile: null, // Will be fetched next
        lastAction: "signup",
      };

      setAuth(newAuth);
      localStorage.setItem("auth", JSON.stringify(newAuth));

      // Fetch user profile after storing the token
      const profileResponse = await api.get("/jobseeker/profile");
      const { profile } = profileResponse.data;

      // Update auth state with profile
      const updatedAuth = {
        ...newAuth,
        profile,
      };

      setAuth(updatedAuth);
      localStorage.setItem("auth", JSON.stringify(updatedAuth));
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  // Function to handle logout
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      profile: null,
      lastAction: null,
    });
    localStorage.removeItem("auth");
  };

  // Function to update profile in context
  const updateProfile = (updatedProfile) => {
    const newAuth = {
      ...auth,
      profile: updatedProfile,
    };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  return (
    <AuthContext.Provider
      value={{ auth, loginUser, signupUser, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
