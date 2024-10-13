import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [jobType, setJobType] = useState("Select job type");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    console.log("Job Type:", jobType);
    console.log("Keyword:", keyword);
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 pt-20">
      {" "}
      {/* Adjusted here */}
      <div className="flex items-center bg-white rounded-full shadow-lg p-4 w-full max-w-4xl">
        <select
          className="bg-transparent text-gray-500 outline-none px-4 py-2 rounded-l-full"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option disabled>Select job type</option>
          <option value="internship">Internship</option>
          <option value="job">Job</option>
        </select>

        <input
          type="text"
          placeholder="Enter keyword / designation / companies"
          className="flex-grow px-4 py-2 text-gray-600 outline-none"
          style={{ width: "400px" }} // Adjusted input width
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
