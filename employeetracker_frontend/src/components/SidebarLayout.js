import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SidebarLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 vh-100 d-flex flex-column"
        style={{ width: "220px", position: "fixed" }}
      >
  <h4 className="text-center sidebar-brand">🏢 Company</h4>
        <hr className="text-light" />
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/">Employees</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/leaves">Leave Requests</Link></li>
        </ul>

        {/* Logout at bottom */}
        <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export default SidebarLayout;