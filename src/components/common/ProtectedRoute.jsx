// frontend/src/components/common/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { RecruiterAuthContext } from "../../context/RecruiterAuthContext";

const ProtectedRoute = ({ isRecruiter = false }) => {
  const { auth: jobSeekerAuth } = useContext(AuthContext);
  const { auth: recruiterAuth } = useContext(RecruiterAuthContext);
  // Add inside ProtectedRoute
console.log("Job Seeker Auth:", jobSeekerAuth);
console.log("Recruiter Auth:", recruiterAuth);


  if (isRecruiter) {
    return recruiterAuth && recruiterAuth.isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/auth/recruiter/login" replace />
    );
  } else {
    return jobSeekerAuth && jobSeekerAuth.isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/auth/jobseeker/login" replace />
    );
  }
};

export default ProtectedRoute;
