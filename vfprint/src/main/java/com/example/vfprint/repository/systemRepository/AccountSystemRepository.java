package com.example.vfprint.repository.systemRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vfprint.entity.system.AccountSystem;
import java.util.UUID;

@Repository
public interface AccountSystemRepository extends JpaRepository<AccountSystem, UUID> {
    boolean existsByEmail(String email);
    // Custom query methods can be defined here if needed
    AccountSystem findByEmail(String email);
    AccountSystem findByName(String name);

}
