package com.example.employeetracker.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ensures that no two users can have the same username
    @Column(unique = true)
    private String username;
    private String password; // We will encode it
    private String role;     // Example: "ADMIN", "EMPLOYEE"
}
