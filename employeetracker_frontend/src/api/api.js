import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

export const api = {
  // Employees
  getEmployees: () => axios.get(`${BASE_URL}/employees`),
  createEmployee: (employee) => axios.post(`${BASE_URL}/employees`, employee),
  deleteEmployee: (id) => axios.delete(`${BASE_URL}/employees/${id}`),

  // Leave Requests
  getLeaves: () => axios.get(`${BASE_URL}/leave-requests`),
  getLeavesByEmployee: (employeeId) =>
    axios.get(`${BASE_URL}/leave-requests/by-employee/${employeeId}`),
  createLeave: (leave) => axios.post(`${BASE_URL}/leave-requests`, leave),
  approveLeave: (id) => axios.put(`${BASE_URL}/leave-requests/${id}/approve`),
  rejectLeave: (id) => axios.put(`${BASE_URL}/leave-requests/${id}/reject`),
};
