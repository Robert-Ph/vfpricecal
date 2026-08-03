package com.example.vfprint.entity.system;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
@Table(name = "invoice_sequence")
public class InvoiceSequence {

    @Id
    private Long id;
    
    private Long sequenceValue;
}
