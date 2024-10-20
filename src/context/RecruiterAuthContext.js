// frontend/src/context/RecruiterAuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const RecruiterAuthContext = createContext();

export const RecruiterAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    recruiter: null,
    token: null,
    lastAction: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("recruiterAuth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const loginRecruiter = async (credentials) => {
    try {
      const response = await api.post("/recruiter/login", credentials);
      const { token, recruiter } = response.data;

      const newAuth = {
        isAuthenticated: true,
        recruiter,
        token,
        lastAction: "login",
      };

      setAuth(newAuth);
      localStorage.setItem("recruiterAuth", JSON.stringify(newAuth));
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const signupRecruiter = async (userData) => {
    try {
      const response = await api.post("/recruiter/signup", userData);
      const { token, recruiter } = response.data;

      const newAuth = {
        isAuthenticated: true,
        recruiter,
        token,
        lastAction: "signup",
      };

      setAuth(newAuth);
      localStorage.setItem("recruiterAuth", JSON.stringify(newAuth));
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      recruiter: null,
      token: null,
      lastAction: null,
    });
    localStorage.removeItem("recruiterAuth");
  };

  return (
    <RecruiterAuthContext.Provider
      value={{ auth, loginRecruiter, signupRecruiter, logout }}
    >
      {children}
    </RecruiterAuthContext.Provider>
  );
};
