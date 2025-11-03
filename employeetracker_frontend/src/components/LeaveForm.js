import React, { useState, useEffect } from "react";
import { api } from "../api/api";

function LeaveForm({ onSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [leave, setLeave] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  useEffect(() => {
    api.getEmployees().then(res => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.createLeave(leave)
      .then(() => {
        alert("Leave request submitted.");
        setLeave({ employeeId: "", leaveType: "", startDate: "", endDate: "", reason: "" });
        onSuccess();
      })
      .catch(err => console.error("Error submitting leave:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mt-3">

      <div className="row mt-2">
        <div className="col">
          <label><b>Employee</b></label>
          <select
            className="form-select"
            name="employeeId"
            value={leave.employeeId}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <label><b>Leave Type</b></label>
          <select
            className="form-select"
            name="leaveType"
            value={leave.leaveType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Annual">Annual</option>
            <option value="Sick">Sick</option>
            <option value="Maternity">Maternity</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label><b>Start Date</b></label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={leave.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <label><b>End Date</b></label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={leave.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mt-2">
        <label><b>Reason</b></label>
        <textarea
          className="form-control"
          name="reason"
          rows={2}
          value={leave.reason}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  );
}

export default LeaveForm;