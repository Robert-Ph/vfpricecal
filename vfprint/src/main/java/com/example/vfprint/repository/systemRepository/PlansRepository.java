package com.example.vfprint.repository.systemRepository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.system.Plans;


@Repository
public interface PlansRepository extends JpaRepository<Plans, UUID>{
    Plans findByCode(String code);
}
