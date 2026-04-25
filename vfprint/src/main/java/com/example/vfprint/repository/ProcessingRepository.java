package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Processing;

@Repository
public interface ProcessingRepository extends JpaRepository<Processing, Long> {
    boolean existsByName(String name);
    void deleteByName(String name);
    Processing findByName(String name);
}
