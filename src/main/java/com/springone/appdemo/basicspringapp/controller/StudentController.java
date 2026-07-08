package com.springone.appdemo.basicspringapp.controller;



import com.springone.appdemo.basicspringapp.entity.Bca;
import com.springone.appdemo.basicspringapp.service.BcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private BcaService bcaService;

    // Get all students
    @GetMapping("/all")
    public List<Bca> getAllStudents() {
        return bcaService.getAllStu();
    }

    // Save a student
    @PostMapping("/save")
    public String saveStudent(@RequestBody Bca bca) {
        return bcaService.save_bca(bca);
    }

    // Delete a student
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        return bcaService.del_stu(id);
    }

    // Update a student
    @PutMapping("/update/{id}")
    public Bca updateStudent(@PathVariable Long id, @RequestBody Bca bca) {
        return bcaService.edit_bca(id, bca);
    }
}