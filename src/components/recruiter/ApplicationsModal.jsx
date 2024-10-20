// frontend/src/components/recruiter/ApplicationsModal.jsx

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ApplicantProfileModal from "./ApplicantProfileModal";

const ApplicationsModal = ({ job, onClose }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(
          `/recruiter/jobs/${job.id}/applications`
        );
        setApplications(response.data.applications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, [job.id]);

  const handleViewProfile = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseProfileModal = () => {
    setSelectedApplicant(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Applications for {job.title}
        </h2>
        <div className="overflow-y-auto max-h-96">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div key={app.id} className="mb-4 p-4 border rounded">
                <h3 className="text-xl font-semibold">{app.name}</h3>
                <p>
                  <strong>Email:</strong> {app.email}
                </p>
                <p>
                  <strong>Cover Letter:</strong> {app.cover_letter}
                </p>
                <button
                  onClick={() => handleViewProfile(app)}
                  className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <p>No applications yet.</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>

      {selectedApplicant && (
        <ApplicantProfileModal
          applicant={selectedApplicant}
          onClose={handleCloseProfileModal}
        />
      )}
    </div>
  );
};

export default ApplicationsModal;
