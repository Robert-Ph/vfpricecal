package com.example.vfprint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Companies;

@Repository
public interface CompaniesRepository extends JpaRepository<Companies, Long>{


   @Query("""
            SELECT c FROM Companies c
            WHERE c.name LIKE %:param% OR c.phone LIKE %:param% OR c.address LIKE %:param%
            """)
    List<Companies> search(@Param("param") String param);
    boolean existsByName(String name);
}
