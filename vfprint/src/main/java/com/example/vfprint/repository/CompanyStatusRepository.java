package com.example.vfprint.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.CompaniesStatus;
import java.util.Optional;

@Repository
public interface CompanyStatusRepository extends JpaRepository<CompaniesStatus, UUID> {
    Optional<CompaniesStatus> findById(UUID id);
}
