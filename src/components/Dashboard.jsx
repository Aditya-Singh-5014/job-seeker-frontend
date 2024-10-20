// frontend/src/components/Dashboard.js
import React, { useEffect, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.pathname === '/dashboard/home') {
      if (auth.isAuthenticated) {
        if (auth.lastAction === 'signup') {
          setMessage(`You have signed up and are logged in as ${auth.user.username}.`);
        } else if (auth.lastAction === 'login') {
          setMessage(`You are logged in as ${auth.user.username}`);
        } else {
          setMessage('');
        }
      }
    } else {
      setMessage(''); // Clear the message on other pages
    }
  }, [auth, location.pathname]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-64">
        {/* Navbar with username and logout */}
        <Navbar />

        <div className="min-h-screen bg-gray-100 p-6">
          {/* Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
              {message}
            </div>
          )}
          {/* Render nested routes like Home, Profile, etc. */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
