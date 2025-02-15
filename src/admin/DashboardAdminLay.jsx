// src/components/DashboardLayout.jsx
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/AdminNav";
import { ThemeContext } from "../context/ThemeContext";

const DashboardLayoutAdm = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`dashboard-layout ${darkMode ? "dark-theme" : "light-theme"}`}>
      <AdminNavbar />
        <div className="dashboard-content flex-1">
          <Outlet />
        </div>
    </div>
  );
};

export default DashboardLayoutAdm;
