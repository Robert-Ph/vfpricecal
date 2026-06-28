package com.example.vfprint.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.enums.Priority;


@Repository
public interface ProfitRepository extends JpaRepository<Profit, UUID> {
    boolean existsByName(String name);
    List<Profit> findByCompanyId(UUID companyId);
    Optional<Profit> findByIdAndCompanyId(UUID id, UUID companyId);
    Profit findByPriority(Priority priority);
}
