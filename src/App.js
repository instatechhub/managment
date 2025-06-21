import React, { useState, useEffect, useRef,useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import AppRoutes from "./Routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import { CgMenuGridO } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import Login from "./Components/Login/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "./Store/AuthStore/AuthStore";

function AppWrapper() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        theme="colored"
      />
    </>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const { user,getManager } = useAuthStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      if (token) {
       await getManager();
      } else {
        navigate("/");
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      navigate("/");
      localStorage.removeItem('token')
    }
  }, [token, navigate]);

    useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!token || !user) {
      navigate("/");
    }
  }, [token, user, navigate]);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".menu-icon")
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        className={`sidebar-fixed ${sidebarOpen ? "open" : ""}`}
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
