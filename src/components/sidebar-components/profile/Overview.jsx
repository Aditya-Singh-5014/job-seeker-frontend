import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";

const Overview = () => {
  const { auth } = useContext(AuthContext);
  const { user, profile } = auth;

  if (!profile) {
    return (
      <div className="p-6 bg-white rounded shadow-md w-full max-w-4xl">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div
        className={`flex justify-between items-center border-b-2 pb-4 mb-8 ${
          !profile.name && "hidden"
        }`}
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {profile.name}
          </h1>
          <p className="text-lg text-blue-600 font-semibold">
            {profile.primary_role}
          </p>
          {/* Job title */}
          <p className="text-lg text-gray-600 mt-1">
            {profile.experience
              ? `${profile.experience} years of experience`
              : "Experience not provided"}{" "}
            {/* Highlights experience */}
          </p>
          <div className="mt-2">
            <p className="text-lg text-gray-600">
              <span className="font-semibold text-gray-700">Location:</span>{" "}
              {profile.location ? profile.location : "Location not provided"}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold text-gray-700">Timezone:</span>{" "}
              {profile.timezone ? profile.timezone : "Timezone not provided"}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold text-gray-700">Remote Work:</span>{" "}
              {profile.openToRemote
                ? "Open to remote work"
                : "Not open to remote work"}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          {profile.resume && (
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 shadow-sm transition"
            >
              View Resume
            </a>
          )}
        </div>
      </div>

      {/* Bio Section */}
      <div className={`${!profile.bio && "hidden"} mb-8`}>
        <h2 className="text-2xl font-semibold text-gray-800">Bio</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">{profile.bio}</p>
      </div>

      {/* Looking For Section */}
      <div className={`${!profile.lookingFor && "hidden"} mb-8`}>
        <h2 className="text-2xl font-semibold text-gray-800">Looking For</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">
          {profile.lookingFor}
        </p>
      </div>

      {/* Experience Section */}
      <div className={`${!profile.work_experience?.length && "hidden"} mb-8`}>
        <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
        {profile.work_experience?.map((exp, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-medium text-gray-800">{exp.title}</h3>
            <p className="text-gray-600 italic">
              {exp.company} • {exp.duration}
            </p>
            <p className="text-gray-700 mt-2 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className={`${!profile.education?.university && "hidden"} mb-8`}>
        <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        {profile.education && (
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-800">
              {profile.education.degree}
            </h3>
            <p className="text-gray-600 italic">
              {profile.education.university} • {profile.education.year}
            </p>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div
        className={`mb-8 ${
          !profile.linkedin &&
          !profile.github &&
          !profile.twitter &&
          !profile.website &&
          "hidden"
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Social Profiles
        </h2>
        <div className="flex space-x-6 mt-4">
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FaLinkedin className="text-3xl" />
            </a>
          )}
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700"
            >
              <FaGithub className="text-3xl" />
            </a>
          )}
          {profile.twitter && (
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <FaTwitter className="text-3xl" />
            </a>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500"
            >
              <FaGlobe className="text-3xl" />
            </a>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className={`${!profile.skills && "hidden"} mb-8`}>
        <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">{profile.skills}</p>
      </div>

      {/* Achievements Section */}
      <div className={`${!profile.achievements && "hidden"} mb-8`}>
        <h2 className="text-2xl font-semibold text-gray-800">Achievements</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">
          {profile.achievements}
        </p>
      </div>
    </div>
  );
};

export default Overview;
