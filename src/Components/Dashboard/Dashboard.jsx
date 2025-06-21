import React from 'react';
import DashboardStats from './DashboardStatus';
import useAuthStore from '../../Store/AuthStore/AuthStore';

const Dashboard = () => {
  const {user} = useAuthStore();
  return (
    <div className="container">
     <h2 className="mt-3">
  Welcome, {typeof user?.name === "string" ? user.name.toUpperCase() : "NA"}
</h2>
      <DashboardStats />
    </div>
  );
};

export default Dashboard;