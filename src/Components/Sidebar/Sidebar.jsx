import React from 'react';
import { Link } from 'react-router-dom';
// import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3">
      <h4>Manager Panel</h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/add-employee">Add Employee</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/mark-attendance">Mark Attendance</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/view-attendance">View Attendance</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/reports">Reports</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
