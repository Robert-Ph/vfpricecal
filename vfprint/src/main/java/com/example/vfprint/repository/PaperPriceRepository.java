package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.PaperPrice;

@Repository
public interface PaperPriceRepository extends JpaRepository<PaperPrice, Long>    {
    boolean existsByPaperSizeId(Long paperSizeId);
    void deleteByPaperSizeId(Long paperSizeId);
}
