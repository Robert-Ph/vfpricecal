package com.example.vfprint.service.system;



import java.time.LocalDateTime;
import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.entity.system.Plans;
import com.example.vfprint.entity.system.SubscriptionStatuses;
import com.example.vfprint.entity.system.SubscriptionTypes;
import com.example.vfprint.dto.system.CompansySubscriptionsDTO;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.repository.systemRepository.CompansySubscriptionsRepository;
import com.example.vfprint.repository.systemRepository.PlansRepository;
import com.example.vfprint.repository.systemRepository.SubscriptionStatusesRepository;
import com.example.vfprint.repository.systemRepository.SubscriptionTypesRepository;

@Service
public class CompansySubscriptionsService {
    @Autowired
    private CompansySubscriptionsRepository compansySubscriptionsRepository;

    @Autowired
    private PlansRepository plansRepository;

    @Autowired
    private CompaniesRepository companiesRepository;

    @Autowired
    private SubscriptionTypesRepository subscriptionTypesRepository;

    @Autowired
    private SubscriptionStatusesRepository subscriptionStatusesRepository;

    @Transactional
    public void createCompansySubscriptions(CompansySubscriptionsDTO dto){

        Companies companies = companiesRepository.findById(dto.getCompanyId()).orElseThrow();
        Plans plan = plansRepository.findById(dto.getPlanId()).orElseThrow();
        int end = 30;
        String nameType = "";
        if(plan.getCode().equals("TRIAL")){
            nameType = "TRIAL";
        }else{
            nameType ="PAID";
            switch (dto.getTime()) {
            case "one-month":
                end = 30;
                break;
            case "one-year":
                end = 365;
                break;
            case "tow-year":
                end = 730;
                break;
            case "three-year":
                end = 1095;
                break;
            default:
                end = 30;
        }
        }

        SubscriptionTypes subscriptionTypes = subscriptionTypesRepository.findByCode(nameType);
        SubscriptionStatuses statuses = subscriptionStatusesRepository.findByCode("ACTIVE");

        


        CompansySubscriptions result = CompansySubscriptions.builder()
                                        .company(companies)
                                        .plan(plan)
                                        .subscriptionType(subscriptionTypes)
                                        .subscriptionStatus(statuses)
                                        .startDate(Timestamp.valueOf(LocalDateTime.now()))
                                        .endDate(Timestamp.valueOf(LocalDateTime.now().plusDays(end)))
                                        .autoRenewalDate(true)
                                        .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                                        .build();                                            
        
        compansySubscriptionsRepository.save(result);

    }
}
