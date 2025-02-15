// src/components/DashboardLayout.jsx
import React, { useContext,useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../context/ThemeContext";

const DashboardLayout = () => {
  const { darkMode } = useContext(ThemeContext);
useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div className={`dashboard-layout ${darkMode ? "dark-theme" : "light-theme"}`}>
      <Navbar />
      <div className="dashboard-body flex">
        <Sidebar />
        <div className="dashboard-content flex-1">
         
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
