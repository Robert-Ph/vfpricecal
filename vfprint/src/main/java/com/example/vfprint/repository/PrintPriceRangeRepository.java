package com.example.vfprint.repository;

import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.PrintPriceRange;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface PrintPriceRangeRepository extends JpaRepository<PrintPriceRange, UUID> {
    boolean existsByPrintPriceIdAndMinLengthCmLessThanEqualAndMaxLengthCmGreaterThanEqual(
        UUID printPriceId, Float lengthCm1, Float lengthCm2);
    
}
