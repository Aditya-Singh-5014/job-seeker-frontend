// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  // Assuming the username is sent via the login/signup response or passed via state in navigation
  useEffect(() => {
    if (location.state && location.state.username) {
      setUsername(location.state.username);
    } else {
      // Provide a fallback username if location.state is null
      setUsername("Guest"); // Fallback username
    }

    // Checking if the user has just signed up or logged in
    if (location.state && location.state.isSignup) {
      setMessage(
        `Yayyyyy, you are signed up and you are logged in as ${
          location.state?.username || "Guest"
        }`
      );
    } else {
      setMessage(`You are logged in as ${location.state?.username || "Guest"}`);
    }
  }, [location.state]);

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token if stored
    navigate("/"); // Redirect to landing page
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-64">
        {/* Navbar with username and logout */}
        <Navbar username={username} logout={handleLogout} />

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          {/* Render nested routes like Home */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
