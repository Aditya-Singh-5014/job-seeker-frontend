// frontend/src/components/sidebar-components/profile/Overview.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Overview = () => {
  const { auth } = useContext(AuthContext);
  const { user, profile } = auth;

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
      <div className="mb-2">
        <strong>Username:</strong> {user.username}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-2">
        <strong>Bio:</strong> {profile.bio || "N/A"}
      </div>
      <div className="mb-2">
        <strong>Skills:</strong>{" "}
        {profile.skills ? profile.skills.split(", ").join(", ") : "N/A"}
      </div>
      <div className="mb-2">
        <strong>Resume:</strong>{" "}
        {profile.resume ? (
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Resume
          </a>
        ) : (
          "N/A"
        )}
      </div>
    </div>
  );
};

export default Overview;
