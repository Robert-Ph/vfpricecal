package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Roles;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
   
    
}
