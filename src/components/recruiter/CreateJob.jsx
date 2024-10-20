import React, { useState } from "react";
import api from "../../services/api";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    requirements: "",
    salary: "",
    job_type: "Job",      // Default to "Job"
    category: "Web Development",  // Default category
  });
  const [message, setMessage] = useState("");


  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/recruiter/jobs", formData);
      setMessage("Job created successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        requirements: "",
        salary: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to create job.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>
      {message && (
        <div
          className={`mb-4 p-2 ${
            message.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          } rounded`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Job Title"
            required
          />
        </div>

        <div className="mb-4">
  <label className="block text-gray-700 mb-2">Job Type</label>
  <select
    name="job_type"
    value={formData.job_type}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  >
    <option value="Job">Job</option>
    <option value="Internship">Internship</option>
  </select>
</div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Describe the job responsibilities..."
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Location (e.g., Remote, City)"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="List job requirements (skills, qualifications)"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Salary (e.g., $50k - $70k)"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
