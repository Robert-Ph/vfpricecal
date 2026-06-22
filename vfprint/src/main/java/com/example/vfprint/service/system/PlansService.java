package com.example.vfprint.service.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.example.vfprint.dto.system.PlansRequest;
import com.example.vfprint.repository.systemRepository.PlansRepository;
import com.example.vfprint.entity.system.Plans;

@Service
public class PlansService {
    @Autowired
    private PlansRepository plansRepository;

    @Transactional
    public List<PlansRequest> getAllPlansRequest(){
        List<Plans> plans = plansRepository.findAll();
        
       return plans.stream()
                .map(plan -> 
                    PlansRequest.builder()
                    .id(plan.getId())
                    .name(plan.getName())
                    .code(plan.getCode())
                    .price(plan.getPrice())
                    .createAt(plan.getCreatedAt())
                    .durationInDays(plan.getDurationInDays())
                    .description(plan.getDescription())
                    .build()
                )
                .collect(Collectors.toList());
    }


    @Transactional
    public PlansRequest getPlanById(UUID id){
        Plans plans =plansRepository.findById(id).orElseThrow();
        return PlansRequest.builder()
                .id(plans.getId())
                .code(plans.getCode())
                .name(plans.getName())
                .durationInDays(plans.getDurationInDays())
                .price(plans.getPrice())
                .description(plans.getDescription())
                .createAt(plans.getCreatedAt())
                .build();
    } 
}
        
