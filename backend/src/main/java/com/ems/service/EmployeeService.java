package com.ems.service;

import com.ems.model.Employee;
import com.ems.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> all() {
        return repo.findAll();
    }

    public Employee add(Employee e) {
        return repo.save(e);
    }

    public Employee getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Employee update(Long id, Employee updated) {
        return repo.findById(id).map(e -> {
            e.setName(updated.getName());
            e.setEmail(updated.getEmail());
            e.setRole(updated.getRole());
            return repo.save(e);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        return repo.findById(id).map(e -> {
            repo.delete(e);
            return true;
        }).orElse(false);
    }
}
