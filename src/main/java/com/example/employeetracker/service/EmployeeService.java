package com.example.employeetracker.service;

import com.example.employeetracker.dto.EmployeeDTO;
import com.example.employeetracker.exception.ResourceNotFoundException;
import com.example.employeetracker.mapper.MapperUtil;
import com.example.employeetracker.model.Employee;
import com.example.employeetracker.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeDTO create(EmployeeDTO dto) {
        if (dto.getEmail() != null && employeeRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already used");
        }
        Employee e = Employee.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .department(dto.getDepartment())
                .phoneNumber(dto.getPhoneNumber())
                .build();
        e = employeeRepository.save(e);
        return MapperUtil.toEmployeeDTO(e);
    }

    public List<EmployeeDTO> findAll() {
        return employeeRepository.findAll().stream().map(MapperUtil::toEmployeeDTO).collect(Collectors.toList());
    }

    public EmployeeDTO findById(Long id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        return MapperUtil.toEmployeeDTO(e);
    }

    @Transactional
    public EmployeeDTO update(Long id, EmployeeDTO dto) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        e.setFirstName(dto.getFirstName());
        e.setLastName(dto.getLastName());
        e.setEmail(dto.getEmail());
        e.setDepartment(dto.getDepartment());
        e.setPhoneNumber(dto.getPhoneNumber());
        // saved by transactional flush
        return MapperUtil.toEmployeeDTO(e);
    }

    public void delete(Long id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        employeeRepository.delete(e);
    }
}