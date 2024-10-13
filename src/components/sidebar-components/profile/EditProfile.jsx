// frontend/src/components/sidebar-components/profile/EditProfile.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../services/api";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";

const EditProfile = () => {
  const { auth, updateProfile } = useContext(AuthContext);
  const { profile } = auth;

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    primaryRole: "",
    experience: "",
    openRoles: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
    workExperience: [], // Array of work experience objects
    education: [], // Array of education objects
    skills: "",
    achievements: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize form data with existing profile
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        location: profile.location || "",
        primaryRole: profile.primary_role || "",
        experience: profile.experience || "",
        openRoles: profile.open_roles || "",
        bio: profile.bio || "",
        linkedin: profile.linkedin || "",
        github: profile.github || "",
        twitter: profile.twitter || "",
        website: profile.website || "",
        workExperience: profile.work_experience || [],
        education: profile.education ? [profile.education] : [],
        skills: profile.skills || "",
        achievements: profile.achievements || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Work Experience Change
  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...formData.workExperience];
    updatedWorkExperience[index][field] = value;
    setFormData({ ...formData, workExperience: updatedWorkExperience });
  };

  // Add New Work Experience Entry
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        { title: "", company: "", duration: "", description: "" },
      ],
    });
  };

  // Remove Work Experience Entry
  const removeWorkExperience = (index) => {
    const updatedWorkExperience = formData.workExperience.filter(
      (item, i) => i !== index
    );
    setFormData({ ...formData, workExperience: updatedWorkExperience });
  };

  // Handle Education Change
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  // Add New Education Entry
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { university: "", degree: "", gpa: "", year: "" },
      ],
    });
  };

  // Remove Education Entry
  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter(
      (item, i) => i !== index
    );
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        name: formData.name,
        location: formData.location,
        primaryRole: formData.primaryRole,
        experience: formData.experience,
        openRoles: formData.openRoles,
        bio: formData.bio,
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
        website: formData.website,
        workExperience: formData.workExperience,
        education: profile.education || [], // Use profile.education directly
        skills: formData.skills, // Comma-separated string
        achievements: formData.achievements,
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
        {/* About Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Where are you based?
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Select your primary role
            </label>
            <input
              type="text"
              name="primaryRole"
              value={formData.primaryRole}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Primary Role"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Years of experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., 5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Open to the following roles
            </label>
            <input
              type="text"
              name="openRoles"
              value={formData.openRoles}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., Full-Stack Developer, Backend Engineer"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Tell us about yourself..."
              required
            ></textarea>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Social Profiles</h3>
          <div className="mb-4 flex items-center space-x-2">
            <FaLinkedin className="text-blue-700" />
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn"
              className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <FaGithub className="text-gray-800" />
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="GitHub"
              className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <FaTwitter className="text-blue-500" />
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Twitter"
              className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <FaGlobe className="text-green-500" />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website"
              className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
          {formData.workExperience.map((work, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={work.title}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Job Title"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={work.company}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "company", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={work.duration}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "duration",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Jan 2020 - Dec 2021"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  value={work.description}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Describe your role and achievements..."
                  required
                ></textarea>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addWorkExperience}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add Work Experience
          </button>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Education {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">University</label>
                <input
                  type="text"
                  value={edu.university}
                  onChange={(e) =>
                    handleEducationChange(index, "university", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="University Name"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Degree Obtained"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">GPA</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) =>
                    handleEducationChange(index, "gpa", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="GPA"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Year</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) =>
                    handleEducationChange(index, "year", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Graduation Year"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add Education
          </button>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Your Skills</h3>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Node.js"
            className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            required
          />
          <small className="text-gray-500">
            Enter skills separated by commas.
          </small>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Achievements</h3>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="Share your achievements"
            className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
