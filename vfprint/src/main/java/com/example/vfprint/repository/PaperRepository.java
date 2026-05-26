package com.example.vfprint.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, UUID> {
    boolean existsByNameAndCompanyId(String name, UUID companyId);
    Optional<Paper> findByIdAndCompanyId(UUID id, UUID companyId);
}
