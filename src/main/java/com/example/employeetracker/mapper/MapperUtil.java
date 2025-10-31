package com.example.employeetracker.mapper;

import com.example.employeetracker.dto.EmployeeDTO;
import com.example.employeetracker.dto.LeaveRequestDTO;
import com.example.employeetracker.model.Employee;
import com.example.employeetracker.model.LeaveRequest;

import java.util.stream.Collectors;

public class MapperUtil {

    public static EmployeeDTO toEmployeeDTO(Employee e) {
        if (e == null) return null;
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(e.getId());
        dto.setFirstName(e.getFirstName());
        dto.setLastName(e.getLastName());
        dto.setEmail(e.getEmail());
        dto.setDepartment(e.getDepartment());
        dto.setPhoneNumber(e.getPhoneNumber());
        if (e.getLeaveRequests() != null)
            dto.setLeaveRequestIds(e.getLeaveRequests().stream()
                    .map(LeaveRequest::getId)
                    .collect(Collectors.toList()));
        return dto;
    }

    public static LeaveRequestDTO toLeaveRequestDTO(LeaveRequest lr) {
        if (lr == null) return null;
        LeaveRequestDTO dto = new LeaveRequestDTO();
        dto.setId(lr.getId());
        dto.setLeaveType(lr.getLeaveType());
        dto.setStartDate(lr.getStartDate());
        dto.setEndDate(lr.getEndDate());
        dto.setStatus(lr.getStatus());
        dto.setEmployeeId(lr.getEmployee() != null ? lr.getEmployee().getId() : null);
        return dto;
    }
}