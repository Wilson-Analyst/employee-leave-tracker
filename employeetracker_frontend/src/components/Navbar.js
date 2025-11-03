import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav className="app-nav navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand sidebar-brand" to="/">🏢 Company</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Employees</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaves">Leaves</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <div className="d-flex">
            <button className="btn btn-outline-muted me-2" onClick={() => navigate('/profile')}>Profile</button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;