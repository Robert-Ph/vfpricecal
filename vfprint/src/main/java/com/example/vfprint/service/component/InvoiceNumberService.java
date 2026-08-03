package com.example.vfprint.service.component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.entity.system.InvoiceSequence;
import com.example.vfprint.repository.systemRepository.InvoiceSequenceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceNumberService {
    private final InvoiceSequenceRepository invoiceSequenceRepository;

    @Transactional
    public String generateInvoiceNumber() {


        InvoiceSequence sequence =
                invoiceSequenceRepository.findById(1L)
                .orElseThrow();


        Long number =
                sequence.getSequenceValue() + 1;


        sequence.setSequenceValue(number);


        invoiceSequenceRepository.save(sequence);


        String month =
                LocalDate.now()
                .format(
                    DateTimeFormatter.ofPattern("yyyyMM")
                );


        return String.format(
                "INV-%s-%06d",
                month,
                number
        );
    }
}
