// frontend/src/components/auth/recruiter/SignUp.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecruiterAuthContext } from "../../../context/RecruiterAuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signupRecruiter } = useContext(RecruiterAuthContext);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
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
      await signupRecruiter(formData);
      navigate("/recruiter/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error signing up. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Recruiter Sign Up
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 mb-4 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 mb-4 border rounded"
            value={formData.phone}
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
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
