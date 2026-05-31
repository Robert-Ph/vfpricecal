package com.example.vfprint.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Roles;
import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Roles, UUID> {
   
    boolean existsByName(String name);
    Optional<Roles> findByName(String name);
    
}
