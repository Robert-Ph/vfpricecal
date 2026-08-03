package com.example.vfprint.repository.systemRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vfprint.entity.system.RolesSystem;
import java.util.UUID;

@Repository
public interface RolesSystemRepository  extends JpaRepository<RolesSystem, UUID> {
    // Custom query methods can be defined here if needed
    
}
