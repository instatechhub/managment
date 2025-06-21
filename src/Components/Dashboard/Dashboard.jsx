import React from "react";
import DashboardStats from "./DashboardStatus";
import useAuthStore from "../../Store/AuthStore/AuthStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">
          Welcome,{" "}
          {typeof user?.name === "string" ? user.name.toUpperCase() : "NA"}
        </h2>
        <h2>
          Process: 
          {" "}{user?.processName?.toUpperCase()}
        </h2>
      </div>

      <DashboardStats />
    </div>
  );
};

export default Dashboard;
