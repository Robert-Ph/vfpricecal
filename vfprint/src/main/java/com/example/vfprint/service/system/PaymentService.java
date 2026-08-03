package com.example.vfprint.service.system;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.request.PaymentRequest;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.entity.system.Payment;
import com.example.vfprint.entity.system.PaymentStatus;
import com.example.vfprint.entity.system.Plans;
import com.example.vfprint.entity.system.SubscriptionStatuses;
import com.example.vfprint.enums.ActionType;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.repository.systemRepository.PaymentRepository;
import com.example.vfprint.repository.systemRepository.PaymentStatusRepository;
import com.example.vfprint.repository.systemRepository.PlansRepository;
import com.example.vfprint.repository.systemRepository.SubscriptionStatusesRepository;
import com.example.vfprint.service.CompaniesService;
import com.example.vfprint.service.system.CompansySubscriptionsService;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    private final PaymentRepository paymentRepository;
    private final CompaniesService companiesService;
    private final CompansySubscriptionsService compansySubscriptionsService;
    private final PaymentStatusRepository paymentStatusRepository;
    private final PlansRepository plansRepository;
    private final CompaniesRepository companiesRepository;
    private final SubscriptionStatusesRepository statusesRepository;


    @Transactional
public void createPayment(PaymentRequest request){

    Companies companies;

    if("new".equals(request.getType())) {

        companies = companiesService.createCompany(request.getCompanyRes());

        request.getSub().setCompanyId(companies.getId());

    } else {

        Companies company = companiesRepository.findById(request.getCompanyRes().getId()).orElseThrow();
        SubscriptionStatuses statuses = statusesRepository.findByCode("CANCELLED");
        CompansySubscriptions subscriptions = companiesService.getSubscriptionsByActive(company);

        subscriptions.setSubscriptionStatus(statuses);
        compansySubscriptionsService.update(subscriptions);


        request.getSub().setCompanyId(
                request.getCompanyRes().getId()
        );
    }

    Plans plans = plansRepository
            .findById(request.getSub().getPlanId())
            .orElseThrow();

    BigDecimal total =
            plans.getPrice().multiply(BigDecimal.valueOf(request.getSub().getTime())).multiply(BigDecimal.valueOf(1.1));

    CompansySubscriptions cSubscriptions =
            compansySubscriptionsService
                    .createCompansySubscriptions(request.getSub());

    PaymentStatus paymentStatus =
            paymentStatusRepository
                    .findById(request.getPaymentStatus())
                    .orElseThrow();

    Payment payment = Payment.builder()
            .compansySubscription(cSubscriptions)
            .amount(total)
            .paymentStatus(paymentStatus)
            .paidAt(null)
            .createdAt(Timestamp.valueOf(LocalDateTime.now()))
            .build();


    if (paymentStatus.getCode().equals("PAID")) {
        payment.setPaidAt(Timestamp.valueOf(LocalDateTime.now()));
    }

    paymentRepository.save(payment);
}


        @Transactional
public void createPaymentSubscription(BigDecimal totalAmount,PaymentStatus paymentStatus, CompansySubscriptions cSubscriptions){

    Payment payment = Payment.builder()
            .compansySubscription(cSubscriptions)
            .amount(totalAmount)
            .paymentStatus(paymentStatus)
            .paidAt(null)
            .createdAt(Timestamp.valueOf(LocalDateTime.now()))
            .build();

    if (paymentStatus.getCode().equals("PAID")) {
        payment.setPaidAt(Timestamp.valueOf(LocalDateTime.now()));
    }

    paymentRepository.save(payment);
}
}
