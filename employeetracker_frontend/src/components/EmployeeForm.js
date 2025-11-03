import React, { useState } from "react";
import { api } from "../api/api";

function EmployeeForm({ onSuccess }) {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.createEmployee(employee)
      .then(() => {
        alert("Employee added successfully!");
        setEmployee({ firstName: "", lastName: "", email: "", department: "", phoneNumber: "" });
        onSuccess(); // Refresh employee list
      })
      .catch(err => console.error("Error creating employee:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mt-3">
      <div className="row">
        <div className="col">
          <input name="firstName" className="form-control" placeholder="First Name"
            value={employee.firstName} onChange={handleChange} required />
        </div>
        <div className="col">
          <input name="lastName" className="form-control" placeholder="Last Name"
            value={employee.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <input name="email" type="email" className="form-control" placeholder="Email"
            value={employee.email} onChange={handleChange} required />
        </div>
        <div className="col">
          <input name="department" className="form-control" placeholder="Department"
            value={employee.department} onChange={handleChange} />
        </div>
      </div>

      <div className="mt-2">
        <input name="phoneNumber" className="form-control" placeholder="Phone Number"
          value={employee.phoneNumber} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-primary mt-3">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
