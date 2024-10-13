// frontend/src/components/Dashboard.js
import React, { useEffect, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.lastAction === "signup") {
        setMessage(
          `Yayyyyy, you have signed up and you are logged in as ${auth.user.username}. Keep exploring the page!!`
        );
      } else if (auth.lastAction === "login") {
        setMessage(`Yayyyyy, you are logged in as ${auth.user.username}`);
      } else {
        setMessage(`You are logged in as ${auth.user.username}`);
      }
    }
  }, [auth]);

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
