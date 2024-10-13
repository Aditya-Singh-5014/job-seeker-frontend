// frontend/src/components/sidebar-components/profile/Tabs.jsx
import React, { useState } from "react";
import Overview from "./Overview";
import EditProfile from "./EditProfile";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "edit":
        return <EditProfile />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "overview"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "edit"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Profile
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Tabs;
