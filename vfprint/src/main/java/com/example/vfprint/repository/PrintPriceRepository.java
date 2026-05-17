package com.example.vfprint.repository;

import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.PrintPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;



@Repository
public interface PrintPriceRepository extends JpaRepository<PrintPrice, Long>{
    boolean existsByName(String name);
    List<PrintPrice> findByCompanyId(Long companyId);
    Optional<PrintPrice> findById(Long id);
}
