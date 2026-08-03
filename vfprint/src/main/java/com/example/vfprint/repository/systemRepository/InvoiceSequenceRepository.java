package com.example.vfprint.repository.systemRepository;

import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.system.InvoiceSequence;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface InvoiceSequenceRepository extends JpaRepository<InvoiceSequence, Long> {
    
}
