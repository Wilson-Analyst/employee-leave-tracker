import React, { useState, useEffect } from "react";
import LeaveForm from "../components/LeaveForm";
import LeaveList from "../components/LeaveList";
import { api } from "../api/api";

function LeavesPage() {
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = () => {
    api.getLeaves()
      .then(res => setLeaves(res.data))
      .catch(err => console.error("Error fetching leaves:", err));
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div>
      <h2 className="mt-3">Leave Requests</h2>
      <LeaveForm onSuccess={loadLeaves} />
      <LeaveList leaves={leaves} onUpdate={loadLeaves} />
    </div>
  );
}

export default LeavesPage;