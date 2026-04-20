package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {
    boolean existsByNameAndCompanyId(String name, Long companyId);
}
