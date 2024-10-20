// src/components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Job Application Platform
        </h1>
        <div className="grid grid-cols-2 gap-8">
          {/* Job Seeker Section */}
          <div className="p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Job Seeker</h2>
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4"
              onClick={() => navigate("/auth/jobseeker/login")}
            >
              Job Seeker Login
            </button>
            <button
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              onClick={() => navigate("/auth/jobseeker/signup")}
            >
              Job Seeker Sign Up
            </button>
          </div>

          {/* Recruiter Section (inactive for now) */}
          <div className="p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Recruiter</h2>
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4"
              onClick={() => navigate("/auth/recruiter/login")}
            >
              Recruiter Login
            </button>
            <button
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              onClick={() => navigate("/auth/recruiter/signup")}
            >
              Recruiter Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
