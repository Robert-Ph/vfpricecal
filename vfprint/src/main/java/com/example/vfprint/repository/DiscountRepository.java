package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.example.vfprint.entity.Discount;
import com.example.vfprint.enums.Priority;


@Repository
public interface DiscountRepository extends JpaRepository<Discount,UUID> {
    boolean existsByNameAndCompanyId(String name, UUID companyId);
    List<Discount> findByCompanyId(UUID companyId);
    Optional<Discount> findByIdAndCompanyId(UUID id, UUID companyId);
    Discount findDiscountById(UUID id);
    List<Discount> findByPriority(Priority priority);
}
