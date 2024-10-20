import React, { useState } from "react";
import CoverLetterModal from "./CoverLetterModal";

const JobDetailsModal = ({ job, onClose }) => {
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);

  const handleApply = () => {
    setShowCoverLetterModal(true);
  };

  const handleCloseCoverLetterModal = () => {
    setShowCoverLetterModal(false);
    onClose(); // Close both modals
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
          <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
          <p className="mb-2">
            <strong>Description:</strong> {job.description}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="mb-2">
            <strong>Requirements:</strong> {job.requirements}
          </p>
          <p className="mb-2">
            <strong>Salary:</strong> {job.salary}
          </p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Close
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {showCoverLetterModal && (
        <CoverLetterModal jobId={job.id} onClose={handleCloseCoverLetterModal} />
      )}
    </>
  );
};

export default JobDetailsModal;
