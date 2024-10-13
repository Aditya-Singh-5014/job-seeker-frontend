import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";

const Jobs = ({ profile }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b pb-4 mb-6 ${
          !profile.name && "hidden"
        }`}
      >
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">
            {profile.experience} • {profile.location} • {profile.timezone} •{" "}
            {profile.openToRemote}
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Resume
          </button>
        </div>
      </div>

      {/* Looking For Section */}
      <div className={`${!profile.lookingFor && "hidden"} mb-6`}>
        <h2 className="text-xl font-semibold">Looking for</h2>
        <p className="text-gray-700 mt-2">{profile.lookingFor}</p>
      </div>

      {/* Experience Section */}
      <div className={`${!profile.experienceDetails?.length && "hidden"} mb-6`}>
        <h2 className="text-xl font-semibold">Experience</h2>
        {profile.experienceDetails?.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-medium">{exp.title}</h3>
            <p className="text-gray-600">
              {exp.company} • {exp.duration}
            </p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className={`${!profile.education?.length && "hidden"} mb-6`}>
        <h2 className="text-xl font-semibold">Education</h2>
        {profile.education?.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-medium">{edu.degree}</h3>
            <p className="text-gray-600">
              {edu.university} • {edu.year}
            </p>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <h2
          className={`${
            !profile.linkedin &&
            !profile.github &&
            !profile.twitter &&
            !profile.website &&
            "hidden"
          } text-xl font-semibold`}
        >
          Social Profiles
        </h2>
        <div className="flex space-x-4 mt-2">
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-700 text-2xl" />
            </a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-800 text-2xl" />
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-500 text-2xl" />
            </a>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              <FaGlobe className="text-green-500 text-2xl" />
            </a>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className={`${!profile.skills && "hidden"} mb-6`}>
        <h2 className="text-xl font-semibold">Skills</h2>
        <p className="text-gray-700 mt-2">{profile.skills}</p>
      </div>

      {/* Achievements Section */}
      <div className={`${!profile.achievements && "hidden"} mb-6`}>
        <h2 className="text-xl font-semibold">Achievements</h2>
        <p className="text-gray-700 mt-2">{profile.achievements}</p>
      </div>
    </div>
  );
};

export default Jobs;
