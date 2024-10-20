import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ApplicationsModal from "./ApplicationsModal";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await api.get("/recruiter/jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyJobs();
  }, []);

  const handleViewApplications = (job) => {
    setSelectedJob(job);
    setShowApplicationsModal(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setShowApplicationsModal(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p>{job.description}</p>
          <button
            onClick={() => handleViewApplications(job)}
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            View Applications
          </button>
        </div>
      ))}

      {showApplicationsModal && selectedJob && (
        <ApplicationsModal job={selectedJob} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MyJobs;
