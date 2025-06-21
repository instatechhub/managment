import React from 'react';
import DashboardStats from './DashboardStatus';
import useAuthStore from '../../Store/AuthStore/AuthStore';

const Dashboard = () => {
  const {user} = useAuthStore();
  return (
    <div className="container">
      <h2 className="mt-3">Welcome, {user?.name.toUpperCase()}</h2>
      <DashboardStats />
    </div>
  );
};

export default Dashboard;