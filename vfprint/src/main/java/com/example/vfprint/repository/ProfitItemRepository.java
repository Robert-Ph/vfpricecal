package com.example.vfprint.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.entity.ProfitItem;

@Repository
public interface ProfitItemRepository extends JpaRepository<ProfitItem, UUID> {
    List<ProfitItem> findByProfit(Profit profit);
    ProfitItem findByName(String name);
}
