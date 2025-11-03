import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import LeavesPage from "./pages/LeavesPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SidebarLayout from "./components/SidebarLayout";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<PrivateRoute><SidebarLayout><EmployeesPage /></SidebarLayout></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><SidebarLayout><DashboardPage /></SidebarLayout></PrivateRoute>} />
        <Route path="/leaves" element={<PrivateRoute><SidebarLayout><LeavesPage /></SidebarLayout></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;