package com.example.vfprint.repository.systemRepository;

import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.system.Invoices;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

@Repository
public interface InvoicesRepository extends JpaRepository<Invoices, UUID> {
    
}
