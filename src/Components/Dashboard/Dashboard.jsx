import React from 'react';
import DashboardStats from './DashboardStatus';

const Dashboard = () => {
  return (
    <div className="container">
      <h2 className="mt-3">Welcome, Manager</h2>
      <DashboardStats />
    </div>
  );
};

export default Dashboard;