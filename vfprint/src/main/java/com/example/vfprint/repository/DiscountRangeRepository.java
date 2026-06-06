package com.example.vfprint.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.example.vfprint.entity.DiscountRange;

import java.math.BigDecimal;
import java.util.List;


@Repository
public interface DiscountRangeRepository extends JpaRepository<DiscountRange, UUID> {
    List<DiscountRange> findByDiscountId(UUID discountId);
    boolean existsByMaxAmount(BigDecimal maxAmount);
}
