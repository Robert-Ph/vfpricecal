package com.example.vfprint.repository.systemRepository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vfprint.entity.system.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    
}
