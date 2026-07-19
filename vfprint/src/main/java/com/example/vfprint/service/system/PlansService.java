package com.example.vfprint.service.system;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.example.vfprint.dto.system.PlansRequest;
import com.example.vfprint.repository.systemRepository.PlansRepository;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.entity.system.Plans;
import com.example.vfprint.dto.system.PlansResponse;

@Service
@RequiredArgsConstructor
public class PlansService {
    
    private final PlansRepository plansRepository;

    @Transactional(readOnly = true)
    public List<PlansResponse> getAllPlansRequest(){
        List<Plans> plans = plansRepository.findAll();
        
       return plans.stream()
                .map(plan -> 
                    PlansResponse.builder()
                    .id(plan.getId())
                    .name(plan.getName())
                    .code(plan.getCode())
                    .price(plan.getPrice())
                    .createdAt(plan.getCreatedAt())
                    .updatedAt(plan.getUpdatedAt())
                    .maxBranches(plan.getMaxBranches())
                    .maxProducts(plan.getMaxProducts())
                    .maxUsers(plan.getMaxUsers())
                    .durationInDays(plan.getDurationInDays())
                    .description(plan.getDescription())
                    .build()
                )
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public PlansResponse getPlanById(UUID id){
        Plans plans =plansRepository.findById(id).orElseThrow();
        return PlansResponse.builder()
                .id(plans.getId())
                .code(plans.getCode())
                .name(plans.getName())
                .durationInDays(plans.getDurationInDays())
                .price(plans.getPrice())
                .maxProducts(plans.getMaxProducts())
                .maxUsers(plans.getMaxUsers())
                .maxBranches(plans.getMaxBranches())
                .description(plans.getDescription())
                .createdAt(plans.getCreatedAt())
                .updatedAt(plans.getUpdatedAt())
                .build();
    } 


    @Transactional
    public void createPlan(PlansRequest plansRequest){
        Plans plans = Plans.builder()
                .name(plansRequest.getName())
                .code(plansRequest.getCode())
                .price(plansRequest.getPrice())
                .durationInDays(plansRequest.getDurationInDays())
                .isCustom(plansRequest.getIsCustom())
                .maxUsers(plansRequest.getMaxUsers())
                .maxProducts(plansRequest.getMaxProducts())
                .maxBranches(plansRequest.getMaxBranches())
                .description(plansRequest.getDescription())
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        plansRepository.save(plans);
        
    }

    @Transactional
    public void updatePlan(UUID id, PlansRequest plansRequest){
        Plans plans = plansRepository.findById(id).orElseThrow();
        plans.setName(plansRequest.getName());
        plans.setCode(plansRequest.getCode());
        plans.setPrice(plansRequest.getPrice());
        plans.setDurationInDays(plansRequest.getDurationInDays());
        plans.setIsCustom(plansRequest.getIsCustom());
        plans.setMaxUsers(plansRequest.getMaxUsers());
        plans.setMaxProducts(plansRequest.getMaxProducts());
        plans.setMaxBranches(plansRequest.getMaxBranches());
        plans.setDescription(plansRequest.getDescription());
        plans.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        plansRepository.save(plans);
    }
}
        
