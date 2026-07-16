package com.springone.appdemo.basicspringapp.rep;

import com.springone.appdemo.basicspringapp.entity.Bca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BcaRep extends JpaRepository<Bca, Long> {


}
