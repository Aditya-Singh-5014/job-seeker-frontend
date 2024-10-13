// src/components/common/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <ul className="space-y-6 mt-10">
        <li>
          <NavLink
            to="/home" // Updated to /home route
            className="block py-2 px-4 hover:bg-gray-700"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="block py-2 px-4 hover:bg-gray-700">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/jobs" className="block py-2 px-4 hover:bg-gray-700">
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink to="/applied" className="block py-2 px-4 hover:bg-gray-700">
            Applied
          </NavLink>
        </li>
        <li>
          <NavLink to="/messages" className="block py-2 px-4 hover:bg-gray-700">
            Messages
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
