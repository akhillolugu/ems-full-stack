package com.ems.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.ems.service.EmployeeService;
import com.ems.model.Employee;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService s) {
        this.service = s;
    }

    // GET all
    @GetMapping
    public List<Employee> all() {
        return service.all();
    }

    // GET by ID
    @GetMapping("/{id}")
    public Employee getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    // CREATE
    @PostMapping
    public Employee add(@RequestBody Employee e) {
        return service.add(e);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee e) {
        return service.update(id, e);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        return service.delete(id) ? "Deleted Successfully" : "Employee Not Found";
    }
}
