package com.example.vfprint.service.system;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.request.SubscriptionRequest;
import com.example.vfprint.dto.system.CompansySubscriptionsDTO;
import com.example.vfprint.dto.request.CompanyRequest;
import com.example.vfprint.dto.request.SubscriTrailOrBetaRequest;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.entity.system.Plans;
import com.example.vfprint.entity.system.SystemConfig;
import com.example.vfprint.enums.ActionType;
import com.example.vfprint.repository.systemRepository.PlansRepository;
import com.example.vfprint.repository.systemRepository.SystemConfigRepository;
import com.example.vfprint.service.CompaniesService;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final CompaniesService companiesService;
    private final CompansySubscriptionsService compansySubscriptionsService;
    private final InvoicesService invoicesService;
    private final SystemConfigRepository systemConfigRepository;
    private final PlansRepository plansRepository;

    @Transactional
    public void createNewSubscription(SubscriptionRequest request) {
        Companies companies = companiesService.createCompany(request.getCompanyRes());
        request.getSub().setCompanyId(companies.getId());

        CompansySubscriptions cSubscriptions =
            compansySubscriptionsService
                    .createCompansySubscriptions(request.getSub());
        invoicesService.createInvoice(request, cSubscriptions, request.getType());
    }


    @Transactional
    public void createSubTrailOrBeta(SubscriTrailOrBetaRequest request){
        if(request.getCustomType().equals("PERSONAL")){
            request.setTradeName(request.getFullName());
            request.setCompany(request.getFullName());
        }
        CompanyRequest companyRequest = CompanyRequest.builder()
                                            .code(request.getTradeName())
                                            .customType(request.getCustomType())
                                            .address("")
                                            .email(request.getEmail())
                                            .name(request.getCompany())
                                            .userName(request.getFullName())
                                            .logoUrl("")
                                            .createAt(Timestamp.valueOf(LocalDateTime.now()))
                                            .phone(request.getPhone())
                                            .taxCode("")
                                            .statusId(request.getStatusId())
                                            .build();
         Companies companies = companiesService.createCompany(companyRequest);

         SystemConfig systemConfig = systemConfigRepository.findByConfigKey("DEFAULT_PLAN");
         Plans plans = plansRepository.findByCode(systemConfig.getConfigValue());
         CompansySubscriptionsDTO sub = CompansySubscriptionsDTO.builder()
                                            .companyId(companies.getId())
                                            .planId(plans.getId())
                                            .build();
        
        CompansySubscriptions cSubscriptions =
            compansySubscriptionsService
                    .createCompansySubscriptions(sub);
        
        SubscriptionRequest subscriptionRequest = SubscriptionRequest.builder()
                                                    .companyRes(companyRequest)
                                                    .sub(sub)
                                                    .paymentStatus(UUID.fromString("c3b2a10f-e9d8-4c7b-6a5f-4e3d2c1b0a9f"))
                                                    .build();

        ActionType actionType = ActionType.NEW;
        invoicesService.createInvoice(subscriptionRequest, cSubscriptions, actionType);
    }
}
