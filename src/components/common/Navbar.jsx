// src/components/common/Navbar.jsx

import React, { useContext } from 'react'; // Ensure useContext is imported
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import { AuthContext } from "../../context/AuthContext";
import { RecruiterAuthContext } from "../../context/RecruiterAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth: jobSeekerAuth, logout: jobSeekerLogout } = useContext(AuthContext);
  const { auth: recruiterAuth, logout: recruiterLogout } = useContext(RecruiterAuthContext);

  const isJobSeeker = jobSeekerAuth.isAuthenticated;
  const isRecruiter = recruiterAuth.isAuthenticated;

  const handleLogout = () => {
    if (isJobSeeker) {
      jobSeekerLogout();
    } else if (isRecruiter) {
      recruiterLogout();
    }
    navigate("/");
  };

  const username = isJobSeeker ? jobSeekerAuth.user.username : recruiterAuth.recruiter.username;

  return (
    <div className="bg-gray-900 text-white h-16 flex justify-between items-center px-4">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate(isRecruiter ? "/recruiter/dashboard/home" : "/dashboard/home")}
      >
        JobSeeker
      </h1>

      {/* Username and Logout */}
      {(isJobSeeker || isRecruiter) && (
        <div className="flex items-center space-x-4">
          <span>Welcome, {username}</span>
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
