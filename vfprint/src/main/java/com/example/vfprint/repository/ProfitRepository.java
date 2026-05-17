package com.example.vfprint.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Profit;

@Repository
public interface ProfitRepository extends JpaRepository<Profit, Long> {
    boolean existsByName(String name);
    Optional<Profit> findById(Long id);
    List<Profit> findByCompanyId(Long companyId);
}
