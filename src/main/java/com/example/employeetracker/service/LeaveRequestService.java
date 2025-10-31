package com.example.employeetracker.service;

import com.example.employeetracker.dto.LeaveRequestDTO;
import com.example.employeetracker.exception.ResourceNotFoundException;
import com.example.employeetracker.mapper.MapperUtil;
import com.example.employeetracker.model.Employee;
import com.example.employeetracker.model.LeaveRequest;
import com.example.employeetracker.repository.EmployeeRepository;
import com.example.employeetracker.repository.LeaveRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRepo;
    private final EmployeeRepository employeeRepo;

    @Transactional
    public LeaveRequestDTO create(LeaveRequestDTO dto) {
        Employee e = employeeRepo.findById(dto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + dto.getEmployeeId()));

        LeaveRequest lr = LeaveRequest.builder()
                .leaveType(dto.getLeaveType())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .status(dto.getStatus() == null ? "PENDING" : dto.getStatus())
                .employee(e)
                .build();

        lr = leaveRepo.save(lr);
        return MapperUtil.toLeaveRequestDTO(lr);
    }

    public List<LeaveRequestDTO> findAll() {
        return leaveRepo.findAll().stream().map(MapperUtil::toLeaveRequestDTO).collect(Collectors.toList());
    }

    public LeaveRequestDTO findById(Long id) {
        LeaveRequest lr = leaveRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("LeaveRequest not found with id " + id));
        return MapperUtil.toLeaveRequestDTO(lr);
    }

    public List<LeaveRequestDTO> findByEmployeeId(Long employeeId) {
        return leaveRepo.findByEmployeeId(employeeId).stream().map(MapperUtil::toLeaveRequestDTO).collect(Collectors.toList());
    }

    @Transactional
    public LeaveRequestDTO approve(Long id) {
        LeaveRequest lr = leaveRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("LeaveRequest not found with id " + id));
        lr.setStatus("APPROVED");
        return MapperUtil.toLeaveRequestDTO(lr);
    }

    @Transactional
    public LeaveRequestDTO reject(Long id) {
        LeaveRequest lr = leaveRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("LeaveRequest not found with id " + id));
        lr.setStatus("REJECTED");
        return MapperUtil.toLeaveRequestDTO(lr);
    }

    public void delete(Long id) {
        LeaveRequest lr = leaveRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("LeaveRequest not found with id " + id));
        leaveRepo.delete(lr);
    }
}
