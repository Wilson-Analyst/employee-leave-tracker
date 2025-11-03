import React, { useEffect, useState } from "react";
import { api } from "../api/api";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalLeaves: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const employeeRes = await api.getEmployees();
      const leavesRes = await api.getLeaves();
      const leaves = leavesRes.data;

      setStats({
        totalEmployees: employeeRes.data.length,
        totalLeaves: leaves.length,
        approved: leaves.filter(l => l.status === "APPROVED").length,
        rejected: leaves.filter(l => l.status === "REJECTED").length,
        pending: leaves.filter(l => l.status === "PENDING").length,
      });
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="row mt-3">
        {[
          { label: "Total Employees", value: stats.totalEmployees },
          { label: "Total Leave Requests", value: stats.totalLeaves },
          { label: "Pending", value: stats.pending },
          { label: "Approved", value: stats.approved },
          { label: "Rejected", value: stats.rejected },
        ].map((item, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card text-center p-3">
              <h5>{item.label}</h5>
              <h3>{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DashboardPage;
