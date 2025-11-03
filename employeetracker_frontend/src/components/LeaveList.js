import React from "react";
import { api } from "../api/api";

function LeaveList({ leaves, onUpdate }) {
  const handleApprove = (id) => {
    api.approveLeave(id).then(() => {
      alert("Leave approved");
      onUpdate();
    });
  };

  const handleReject = (id) => {
    api.rejectLeave(id).then(() => {
      alert("Leave rejected");
      onUpdate();
    });
  };

  return (
    <table className="table table-striped table-hover table-custom mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Employee_id</th>
          <th>Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map((leave, index) => (
          <tr key={leave.id}>
            <td>{index + 1}</td>
            <td>{leave.employeeName || "N/A"}</td>
            <td>{leave.leaveType}</td>
            <td>{leave.startDate}</td>
            <td>{leave.endDate}</td>
            <td>{leave.reason}</td>
            <td>
              {leave.status === "PENDING" && <span className="badge-status badge-pending">PENDING</span>}
              {leave.status === "APPROVED" && <span className="badge-status badge-approved">APPROVED</span>}
              {leave.status === "REJECTED" && <span className="badge-status badge-rejected">REJECTED</span>}
              {!["PENDING","APPROVED","REJECTED"].includes(leave.status) && <span className="badge-status badge-pending">{leave.status}</span>}
            </td>
            <td>
              {leave.status === "PENDING" && (
                <>
                  <button className="btn btn-success btn-sm mx-1" onClick={() => handleApprove(leave.id)}>
                    Approve
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleReject(leave.id)}>
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaveList;
