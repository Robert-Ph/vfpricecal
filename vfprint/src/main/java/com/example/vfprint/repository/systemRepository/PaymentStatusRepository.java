package com.example.vfprint.repository.systemRepository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.vfprint.entity.system.PaymentStatus;

@Repository
public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, UUID>{
    List<PaymentStatus> findByAllowCreate(Boolean allowCreate);
}
