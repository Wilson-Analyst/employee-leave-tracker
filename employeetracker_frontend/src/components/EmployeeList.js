import React from "react";
import { api } from "../api/api";

function EmployeeList({ employees, onDelete }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      api.deleteEmployee(id)
        .then(() => {
          alert("Employee deleted.");
          onDelete();
        })
        .catch(err => console.error("Error deleting employee:", err));
    }
  };

  return (
    <table className="table table-striped table-hover table-custom mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => (
          <tr key={emp.id}>
            <td>{index + 1}</td>
            <td>{emp.firstName} {emp.lastName}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{emp.phoneNumber}</td>
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList;
