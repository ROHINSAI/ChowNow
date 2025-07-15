import React, { useState } from "react";
import Sidebar from "./Sidebar";
import UsersList from "./UsersList";
import OwnersList from "./OwnersList";
import AnalyticsPanel from "./AnalyticsPanel";

const AdminDashboard = () => {
  const [view, setView] = useState("users");

  return (
    <div className="flex">
      <Sidebar setView={setView} />
      <div className="flex-1 p-6">
        {view === "users" && <UsersList />}
        {view === "owners" && <OwnersList />}
        {view === "analytics" && <AnalyticsPanel />}
      </div>
    </div>
  );
};

export default AdminDashboard;
