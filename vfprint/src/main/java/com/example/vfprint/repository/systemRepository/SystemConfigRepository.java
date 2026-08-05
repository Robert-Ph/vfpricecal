package com.example.vfprint.repository.systemRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vfprint.entity.system.SystemConfig;
import java.util.UUID;


@Repository
public interface SystemConfigRepository extends JpaRepository<SystemConfig, UUID> {
    // Custom query methods can be defined here if needed
    SystemConfig findByConfigKey(String configKey);
    
}
