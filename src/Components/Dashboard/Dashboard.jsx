import React from "react";
import DashboardStats from "./DashboardStatus";
import useAuthStore from "../../Store/AuthStore/AuthStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  return (
    <div className="container">
      <div className="d-flex justify-content-between responsive-heading">
        <h2 className="mt-3 responsive-heading">
          <span style={{ fontSize: "20px" }}>Welcome Back!,</span>
          <br />
          <span style={{ fontSize: "20px" }}>
            {typeof user?.name === "string" ? user.name.toUpperCase() : "NA"}
          </span>
        </h2>
        <h2 className="mt-3 responsive-heading">
          <span style={{ fontSize: "20px" }}>Process:</span>
          <span style={{ fontSize: "20px" }}>
            {user?.processName?.toUpperCase()}
          </span>
          <br />
        </h2>
      </div>
      <DashboardStats />
    </div>
  );
};

export default Dashboard;
