import React from "react";
import { NavLink } from "react-router-dom";

const RecruiterSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <ul className="space-y-6 mt-10">
        <li>
          <NavLink
            to="/recruiter/dashboard/home"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 bg-gray-700"
                : "block py-2 px-4 hover:bg-gray-700"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recruiter/dashboard/create-job"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 bg-gray-700"
                : "block py-2 px-4 hover:bg-gray-700"
            }
          >
            Create Job
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recruiter/dashboard/my-jobs" // Updated path
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 bg-gray-700"
                : "block py-2 px-4 hover:bg-gray-700"
            }
          >
            My Jobs
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default RecruiterSidebar;
