package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import com.example.vfprint.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount,Long> {
    boolean existsByName(String name);
    List<Discount> findByCompanyId(Long companyId);
    Optional<Discount> findByIdAndCompanyId(Long id, Long companyId);
    
}
