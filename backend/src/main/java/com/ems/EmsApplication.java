package com.ems;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ems.model.Employee;
import com.ems.repository.EmployeeRepository;

@SpringBootApplication
public class EmsApplication {

    public static void main(String[] args){
        SpringApplication.run(EmsApplication.class,args);
    }

    @Bean
    CommandLineRunner loadData(EmployeeRepository repo) {
        return args -> {
            repo.save(new Employee("Akhil", "akhil@gmail.com", "Developer"));
            repo.save(new Employee("Yamini", "yamini@gmail.com", "Tester"));
            repo.save(new Employee("Ravi", "ravi@gmail.com", "Manager"));
        };
    }
}
