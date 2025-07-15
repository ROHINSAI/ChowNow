import React from "react";

const Sidebar = ({ setView }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <button
        onClick={() => setView("users")}
        className="block w-full text-left hover:bg-gray-700 p-2 rounded"
      >
        View Users
      </button>
      <button
        onClick={() => setView("owners")}
        className="block w-full text-left hover:bg-gray-700 p-2 rounded"
      >
        View Owners
      </button>
      <button
        onClick={() => setView("analytics")}
        className="block w-full text-left hover:bg-gray-700 p-2 rounded"
      >
        View Analytics
      </button>
    </div>
  );
};

export default Sidebar;
