package com.example.vfprint.service.system;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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

    double total =
            (plans.getPrice() * request.getSub().getTime()) * 1.1;

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

    switch (request.getType()) {
        case "new":
                payment.setActionType(ActionType.NEW);
                break;
        case "renew":
                payment.setActionType(ActionType.RENEW);
                break;
        case "upgrade":
                payment.setActionType(ActionType.UPGRADE);
                break;
        case "downgrade":
                payment.setActionType(ActionType.DOWNGRADE);
                break;
        default:
                break;
    }

    if (plans.getCode().endsWith("TRIAL")) {
        payment.setActionType(ActionType.TRIAL);
    }

    if (paymentStatus.getCode().equals("PAID")) {
        payment.setPaidAt(Timestamp.valueOf(LocalDateTime.now()));
    }

    paymentRepository.save(payment);
}
}
