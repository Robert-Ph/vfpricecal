package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.example.vfprint.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID>{


   @Query("""
        SELECT a FROM Account a 
        LEFT JOIN a.company c 
        WHERE (:param IS NULL OR a.email LIKE %:param%) 
     OR (:param IS NULL OR c.name LIKE %:param%)
    """)
    List<Account> search(@Param("param") String param);

     Optional<Account> findByEmail(String email);
    List<Account> findByCompanyId(UUID id);
    boolean existsByEmail(String email);

    
} 
