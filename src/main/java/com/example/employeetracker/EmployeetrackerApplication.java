package com.example.employeetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class EmployeetrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeetrackerApplication.class, args);
	}

}
