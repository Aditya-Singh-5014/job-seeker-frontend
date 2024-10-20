// src/components/sidebar-components/home/Home.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import FaSearch

const Home = () => {
  const navigate = useNavigate();
  const [jobType, setJobType] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    navigate(`/dashboard/jobs?jobType=${jobType}&keyword=${keyword}`);
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 pt-20">
      <div className="flex items-center bg-white rounded-full shadow-lg p-4 w-full max-w-4xl">
        <select
          className="bg-transparent text-gray-500 outline-none px-4 py-2 rounded-l-full"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">Select job type</option>
          <option value="Internship">Internship</option>
          <option value="Job">Job</option>
        </select>

        <input
          type="text"
          placeholder="Enter keyword / designation / companies"
          className="flex-grow px-4 py-2 text-gray-600 outline-none"
          style={{ width: "400px" }}
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
    </div>
  );
};

export default Home;
