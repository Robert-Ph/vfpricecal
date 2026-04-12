package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Companies;

import java.util.List;
import java.util.Optional;

import com.example.vfprint.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{


@Query("""
        SELECT a FROM Account a
        LEFT JOIN Companies c ON a.companyId = c.id
        WHERE a.username LIKE %:param% OR c.name LIKE %:param%
        """)
    List<Account> search(@Param("param") String param);
    Optional<Account> findByUsername(String name);


    
} 
