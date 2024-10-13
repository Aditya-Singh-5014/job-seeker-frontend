// src/components/common/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username, logout }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white h-16 flex justify-between items-center px-4">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        JobSeeker
      </h1>

      {/* Username and Logout */}
      <div className="flex items-center space-x-4">
        <span>Welcome, {username}</span>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
