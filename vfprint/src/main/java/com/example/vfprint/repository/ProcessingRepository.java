package com.example.vfprint.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Processing;

@Repository
public interface ProcessingRepository extends JpaRepository<Processing, UUID> {
    boolean existsByName(String name);
    void deleteByName(String name);
    Processing findByName(String name);
    List<Processing> findByCategoryId(UUID categoryId);
    Optional<Processing> findByIdAndCategoryId(UUID id, UUID categoryId);
    void deleteByCategoryId(UUID categoryId);
}
