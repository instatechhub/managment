import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import AppRoutes from './Routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

function App() {
  return (
    <Router>
      <div className="d-flex app-layout">
      {/* Fixed Sidebar */}
      <div className="sidebar-fixed">
        <Sidebar />
      </div>

      {/* Scrollable App Content */}
      <div className="content-scrollable flex-grow-1 p-3">
        <AppRoutes />
      </div>
    </div>
    </Router>
  );
}

export default App;
