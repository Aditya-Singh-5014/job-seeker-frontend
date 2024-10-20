// src/components/sidebar-components/jobs/Jobs.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import api from "../../../services/api"; // Import api
import JobDetailsModal from "./JobDetailsModal"; // Import the modal component

const Jobs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const [jobType, setJobType] = useState(queryParams.get('jobType') || '');
  const [keyword, setKeyword] = useState(queryParams.get('keyword') || '');

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = new URLSearchParams();
        if (jobType) params.append('jobType', jobType);
        if (keyword) params.append('keyword', keyword);

        const response = await api.get(`/jobs?${params.toString()}`);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, [jobType, keyword]);

  const handleSearch = () => {
    navigate(`/dashboard/jobs?jobType=${jobType}&keyword=${keyword}`);
  };

  // Define handleApplyClick function
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleCloseModal = () => {
    setShowJobModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="flex items-center mb-4">
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="bg-transparent text-gray-500 outline-none px-4 py-2 rounded-l-full"
        >
          <option value="">Select job type</option>
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </select>

        <input
          type="text"
          placeholder="Enter keyword / designation / companies"
          className="flex-grow px-4 py-2 text-gray-600 outline-none border"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-full flex items-center"
          onClick={handleSearch}
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </div>

      {/* Display jobs */}
      {jobs.map((job) => (
        <div key={job.id} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p>{job.description.substring(0, 100)}...</p>
          <button
            onClick={() => handleApplyClick(job)}
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            Apply
          </button>
        </div>
      ))}

      {showJobModal && selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Jobs;
