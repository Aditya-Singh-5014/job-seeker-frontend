// frontend/src/components/common/Navbar.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white h-16 flex justify-between items-center px-4">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard/home")}
      >
        JobSeeker
      </h1>

      {/* Username and Logout */}
      {auth.isAuthenticated && (
        <div className="flex items-center space-x-4">
          <span>Welcome, {auth.user.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
