package com.example.vfprint.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.entity.ProcessingTier;
import java.util.List;


@Repository
public interface ProcessingTierRepository extends JpaRepository<ProcessingTier, UUID> {
    List<ProcessingTier> findByProcessing(Processing processing);
}
