// frontend/src/components/auth/recruiter/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecruiterAuthContext } from "../../../context/RecruiterAuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginRecruiter } = useContext(RecruiterAuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginRecruiter(formData);
      navigate("/recruiter/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error logging in. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Job Seeker Login
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text" // Changed from 'email' to 'text' for username
            name="username" // Ensure name is 'username'
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-6 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
