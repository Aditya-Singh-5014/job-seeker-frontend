import React, { useState } from "react";
import api from "../../../services/api";

const CoverLetterModal = ({ jobId, onClose }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    try {
      await api.post(`/jobs/${jobId}/apply`, { coverLetter });
      setMessage("Applied to job successfully!");
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Failed to apply to job."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Submit Cover Letter</h2>
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
        {!message && (
          <>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-2 border rounded"
              rows="6"
              placeholder="Write your cover letter here..."
            ></textarea>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Submit Application
              </button>
            </div>
          </>
        )}
        {message && (
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default CoverLetterModal;
