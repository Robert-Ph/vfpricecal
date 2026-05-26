package com.example.vfprint.repository;

import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.PrintPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;



@Repository
public interface PrintPriceRepository extends JpaRepository<PrintPrice, UUID>{
    boolean existsByName(String name);
    List<PrintPrice> findByCompanyId(UUID companyId);
    Optional<PrintPrice> findById(UUID id);
    Optional<PrintPrice> findByIdAndCompanyId(UUID id, UUID companyId);
}
