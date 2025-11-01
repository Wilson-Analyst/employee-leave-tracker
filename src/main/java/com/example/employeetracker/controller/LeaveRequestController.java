package com.example.employeetracker.controller;

import com.example.employeetracker.dto.LeaveRequestDTO;
import com.example.employeetracker.model.Employee;
import com.example.employeetracker.model.LeaveRequest;
import com.example.employeetracker.service.LeaveRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
@RequiredArgsConstructor
public class LeaveRequestController {

    private final LeaveRequestService service;

    @PostMapping
    public ResponseEntity<LeaveRequestDTO> create(@Valid @RequestBody LeaveRequestDTO dto) {
        LeaveRequestDTO created = service.create(dto);
        return ResponseEntity.created(URI.create("/api/leave-requests/" + created.getId())).body(created);
    }

    @GetMapping
    public List<LeaveRequestDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public LeaveRequestDTO findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/by-employee/{employeeId}")
    public List<LeaveRequestDTO> findByEmployee(@PathVariable Long employeeId) {
        return service.findByEmployeeId(employeeId);
    }

    @PutMapping("/{id}/approve")
    public LeaveRequestDTO approve(@PathVariable Long id) {
        return service.approve(id);
    }

    @PutMapping("/{id}/reject")
    public LeaveRequestDTO reject(@PathVariable Long id) {
        return service.reject(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}