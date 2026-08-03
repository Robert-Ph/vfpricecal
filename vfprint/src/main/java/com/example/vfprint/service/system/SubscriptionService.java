package com.example.vfprint.service.system;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.request.PaymentRequest;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.entity.system.SubscriptionStatuses;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.service.system.PlansService;
import com.example.vfprint.service.system.PaymentService;
import com.example.vfprint.service.system.SystemconfigService;
import com.example.vfprint.service.system.CompansySubscriptionsService;
import com.example.vfprint.service.CompaniesService;
import com.example.vfprint.repository.systemRepository.SubscriptionStatusesRepository;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final PlansService plansService;
    private final PaymentService paymentService;
    private final SystemconfigService systemconfigService;
    private final CompansySubscriptionsService compansySubscriptionService;
    private final CompaniesService companiesService;
    private final CompaniesRepository companiesRepository;
    private final SubscriptionStatusesRepository statusesRepository;
    private final CompansySubscriptionsService compansySubscriptionsService;
    private final InvoicesService invoicesService;

    @Transactional
    public void createNewSubscription(PaymentRequest request) {
        Companies companies = companiesService.createCompany(request.getCompanyRes());
        request.getSub().setCompanyId(companies.getId());

        CompansySubscriptions cSubscriptions =
            compansySubscriptionsService
                    .createCompansySubscriptions(request.getSub());

        invoicesService.createInvoice(request, cSubscriptions);
    }
}
