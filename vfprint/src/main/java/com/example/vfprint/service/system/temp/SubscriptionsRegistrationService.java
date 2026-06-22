package com.example.vfprint.service.system.temp;

import java.time.LocalDateTime;
import java.util.UUID;
import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.dto.request.SubscriptionsRegistrationRequest;
import com.example.vfprint.entity.system.SubscriptionsRegistration;
import com.example.vfprint.enums.Status;
import com.example.vfprint.repository.systemRepository.SubscriptionsRegistrationREpository;

@Service
public class SubscriptionsRegistrationService {
    
    @Autowired
    private SubscriptionsRegistrationREpository subscriptionsRegistrationREpository;

    @Transactional
    public SubscriptionsRegistration createRegistrationPlan(SubscriptionsRegistrationRequest request){
        SubscriptionsRegistration result = SubscriptionsRegistration.builder()
                                                .companyResId(request.getCompanyResId())
                                                .planID(request.getPlanID())
                                                .month(request.getMonth())
                                                .createAt(Timestamp.valueOf(LocalDateTime.now()))
                                                .status(Status.PENDING)
                                                .build();
        return subscriptionsRegistrationREpository.save(result);
    }

    @Transactional
    public SubscriptionsRegistration getRegistration(UUID id){
        return subscriptionsRegistrationREpository.findById(id).orElseThrow();
    }

}
