package com.example.vfprint.service.system;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.enums.InvoiceStatus;
import com.example.vfprint.repository.systemRepository.InvoicesRepository;
import com.example.vfprint.repository.systemRepository.PaymentStatusRepository;
import com.example.vfprint.repository.systemRepository.PlansRepository;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.service.component.InvoiceNumberService;
import com.example.vfprint.dto.request.PaymentRequest;
import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.entity.system.Invoices;
import com.example.vfprint.entity.system.PaymentStatus;
import com.example.vfprint.entity.system.Plans;

@Service
@RequiredArgsConstructor
public class InvoicesService {
    private final InvoicesRepository invoicesRepository;
    private final PlansRepository plansRepository;
    private final PaymentService paymentService;
    private final InvoiceNumberService invoiceNumberService;
    private final PaymentStatusRepository paymentStatusRepository;

    @Transactional
    public void createInvoice(PaymentRequest request, CompansySubscriptions cSubscriptions) {
            Plans plans = plansRepository
            .findById(request.getSub().getPlanId())
            .orElseThrow();


        BigDecimal total =
            plans.getPrice().multiply(BigDecimal.valueOf(request.getSub().getTime())).multiply(BigDecimal.valueOf(1.1));

        String invoiceNumber = invoiceNumberService.generateInvoiceNumber();
        InvoiceStatus status = InvoiceStatus.PENDING_PAYMENT;
        if (plans.getCode().equals("TRIAL") || plans.getCode().equals("BETA")) {
            status = InvoiceStatus.PAID;
            PaymentStatus paymentStatus = paymentStatusRepository.findById(request.getPaymentStatus()).orElseThrow();
            paymentService.createPaymentSubscription(total, paymentStatus, cSubscriptions);
        }


        Invoices invoice = Invoices.builder()
            .compansySubscription(cSubscriptions)
            .invoiceNumber(invoiceNumber)
            .amount(plans.getPrice())
            .vatRate(BigDecimal.valueOf(10))
            .taxAmount(plans.getPrice().multiply(BigDecimal.valueOf(0.1)))
            .totalAmount(total)
            .status(status)
            .build();
        // Set invoice properties based on request and cSubscriptions
        invoicesRepository.save(invoice);
    }
}
