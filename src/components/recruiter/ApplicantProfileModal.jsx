// frontend/src/components/recruiter/ApplicantProfileModal.jsx

import React from 'react';

const ApplicantProfileModal = ({ applicant, onClose }) => {
  const profile = applicant; // Since we included profile data in applications

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">{profile.name}'s Profile</h2>
        {/* Display profile information here */}
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Location:</strong> {profile.location}</p>
        <p><strong>Primary Role:</strong> {profile.primary_role}</p>
        <p><strong>Experience:</strong> {profile.experience}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>

        {/* Social Links */}
        <div className="mt-4">
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mr-4">
              LinkedIn
            </a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mr-4">
              GitHub
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="mr-4">
              Twitter
            </a>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              Website
            </a>
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
    </div>
  );
};

export default ApplicantProfileModal;
