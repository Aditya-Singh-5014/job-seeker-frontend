// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Dashboard layout with Navbar and Sidebar
import LandingPage from "./components/LandingPage"; // Your landing page
import SignUp from "./components/auth/jobseeker/SignUp"; // Signup page
import Login from "./components/auth/jobseeker/Login"; // Login page
import Home from "./components/sidebar-components/home/Home"; // Home page

function App() {
  const username = "User123"; // This should be dynamic (from backend/auth logic)

  const logout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    window.location.href = "/"; // Redirect to landing page
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} /> {/* Landing page */}
        <Route path="/auth/jobseeker/signup" element={<SignUp />} />{" "}
        {/* Sign-up */}
        <Route path="/auth/jobseeker/login" element={<Login />} /> {/* Login */}
        {/* Dashboard Route (Wrapper for all dashboard routes) */}
        <Route
          path="/dashboard"
          element={<Dashboard username={username} logout={logout} />}
        >
          {/* Nested routes within the Dashboard */}
          <Route path="home" element={<Home />} />{" "}
          {/* Home is now inside Dashboard */}
          {/* You can add other routes like /profile, /jobs, /messages here */}
        </Route>
        {/* Redirect "/home" directly to the nested dashboard home */}
        <Route
          path="/home"
          element={<Dashboard username={username} logout={logout} />}
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
