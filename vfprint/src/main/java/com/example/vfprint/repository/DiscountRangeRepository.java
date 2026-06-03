package com.example.vfprint.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.example.vfprint.entity.DiscountRange;

@Repository
public interface DiscountRangeRepository extends JpaRepository<DiscountRange, UUID> {
    
}
