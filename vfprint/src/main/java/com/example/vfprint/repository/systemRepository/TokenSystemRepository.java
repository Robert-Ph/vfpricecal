package com.example.vfprint.repository.systemRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vfprint.entity.system.TokenSystem;
import java.util.List;
import java.util.UUID;

@Repository
public interface TokenSystemRepository extends JpaRepository<TokenSystem, String> {
    // Custom query methods can be defined here if needed
    List<TokenSystem> findByAccountIdAndRevokedFalse(UUID accountId);
    
}
