package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.example.vfprint.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{

    Optional<Account> findByUserName(String name);


    
} 
