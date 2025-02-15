// src/pages/Dashboard.jsx
import React from "react";




function Dashboard() {
  // Data dummy untuk contoh
  const stats = {
    totalUsers: 2453,
    totalOrders: 1890,
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <div className="header-info">
          <span className="welcome-message">Welcome back, Admin</span>
          <span className="current-date">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Statistik Cards */}
        <div className="stats-card">
          <div className="card-header">
            <h3>Users</h3>
            <i className="fas fa-users icon"></i>
          </div>
          <div className="card-content">
            <span className="stat-number">{stats.totalUsers}</span>
            <span className="stat-trend positive">↑ 12% from last month</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="card-header">
            <h3>Orders</h3>
            <i className="fas fa-shopping-cart icon"></i>
          </div>
          <div className="card-content">
            <span className="stat-number">{stats.totalOrders}</span>
            <span className="stat-trend positive">↑ 8% from last month</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-button primary">
              <i className="fas fa-user-cog"></i>
              Manage Users
            </button>
            <button className="action-button secondary">
              <i className="fas fa-box-open"></i>
              Manage Orders
            </button>
            <button className="action-button success">
              <i className="fas fa-chart-line"></i>
              View Reports
            </button>
          </div>
        </div>

        {/* Recent Activity (Contoh tambahan) */}
        <div className="activity-card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>
              <i className="fas fa-check-circle success-icon"></i>
              New order #1234 received
            </li>
            <li>
              <i className="fas fa-exclamation-triangle warning-icon"></i>
              User registration failed
            </li>
            <li>
              <i className="fas fa-info-circle info-icon"></i>
              System update completed
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;