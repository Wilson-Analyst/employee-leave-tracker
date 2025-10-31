package com.example.employeetracker.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveRequestDTO {
    private Long id;

    @NotNull(message = "leaveType required")
    private String leaveType;

    @NotNull(message = "startDate required")
    private LocalDate startDate;

    @NotNull(message = "endDate required")
    private LocalDate endDate;

    @NotBlank(message = "Reason is required")
    private String reason;

    private String status; // optional, default = PENDING

    @NotNull(message = "employeeId required")
    private Long employeeId;
}
