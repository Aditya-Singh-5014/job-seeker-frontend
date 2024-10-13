// frontend/src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Dashboard layout with Navbar and Sidebar
import LandingPage from "./components/LandingPage"; // Your landing page
import SignUp from "./components/auth/jobseeker/SignUp"; // Signup page
import Login from "./components/auth/jobseeker/Login"; // Login page
import Home from "./components/sidebar-components/home/Home"; // Home page
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Tabs from "./components/sidebar-components/profile/Tabs"; // Profile Tabs
import Jobs from "./components/sidebar-components/jobs/Jobs";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} /> {/* Landing page */}
          <Route path="/auth/jobseeker/signup" element={<SignUp />} />{" "}
          {/* Sign-up */}
          <Route path="/auth/jobseeker/login" element={<Login />} />{" "}
          {/* Login */}
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              {/* Nested routes within the Dashboard */}
              <Route path="home" element={<Home />} />{" "}
              {/* Home is now inside Dashboard */}
              <Route path="profile" element={<Tabs />} />{" "}
              {/* Profile Section */}
              {/* Add other protected routes like /profile, /jobs, /messages here */}
            </Route>
            {/* Redirect "/home" directly to the nested dashboard home */}
            <Route path="/home" element={<Navigate to="/dashboard/home" />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route
              path="/profile"
              element={<Navigate to="/dashboard/profile" />}
            />
          </Route>
          {/* Redirect any undefined routes to landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
