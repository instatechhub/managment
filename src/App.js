import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import AppRoutes from './Routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { CgMenuGridO } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.menu-icon')
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="d-flex app-layout">
      <div className="menu-icon d-md-none" onClick={toggleSidebar}>
        <CgMenuGridO />
      </div>

      <div
        ref={sidebarRef}
        className={`sidebar-fixed ${sidebarOpen ? 'open' : ''}`}
      >
        <Sidebar />
        <div className="close-icon d-md-none" onClick={toggleSidebar}>
          <IoCloseCircleOutline />
        </div>
      </div>
      <div className="content-scrollable flex-grow-1 p-3">
        <AppRoutes />
      </div>
    </div>
  );
}

export default AppWrapper;
