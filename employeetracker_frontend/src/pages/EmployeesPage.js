import React, { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { api } from "../api/api";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  // Fetch employees from backend
  const loadEmployees = () => {
    api.getEmployees()
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error("Error fetching employees:", error));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div>
      <h2 className="mt-3">Employee Management</h2>
      <EmployeeForm onSuccess={loadEmployees} />
      <EmployeeList employees={employees} onDelete={loadEmployees} />
    </div>
  );
}

export default EmployeesPage;
