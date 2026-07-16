package com.springone.appdemo.basicspringapp.service;

import com.springone.appdemo.basicspringapp.entity.Bca;
import com.springone.appdemo.basicspringapp.rep.BcaRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BcaService {

    @Autowired
    private BcaRep bca_rep;

    // Get all students
    public List<Bca> getAllStu() {
        return bca_rep.findAll();
    }

    // Save student
    public String save_bca(Bca bca) {
        bca_rep.save(bca);
        return "Data Saved Successfully";
    }

    // Delete student
    public String del_stu(Long id) {
        bca_rep.deleteById(id);
        return id + " Data Deleted Successfully";
    }

    // Update student
    public Bca edit_bca(Long id, Bca bca) {
        Bca b = bca_rep.findById(id).orElse(null);

        if (b != null) {
            b.setJava(bca.getJava());
            b.setName(bca.getName());
            b.setPython(bca.getPython());
            return bca_rep.save(b);
        }

        return null;
    }
}