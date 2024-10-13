// frontend/src/components/sidebar-components/profile/EditProfile.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../services/api";

const EditProfile = () => {
  const { auth, updateProfile } = useContext(AuthContext);
  const { profile } = auth;

  const [formData, setFormData] = useState({
    bio: profile.bio || "",
    skills: profile.skills || "",
    resume: profile.resume || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        bio: formData.bio,
        skills: formData.skills, // Expecting comma-separated string
        resume: formData.resume,
      };

      const response = await api.put("/jobseeker/profile", payload);

      updateProfile(response.data.profile);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., JavaScript, React, Node.js"
          />
          <small className="text-gray-500">
            Enter skills separated by commas.
          </small>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Resume URL</label>
          <input
            type="url"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/your-resume.pdf"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
