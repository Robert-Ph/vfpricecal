package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.ArrayList;
import com.example.vfprint.dto.request.ProfitRequest;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.repository.ProfitRepository;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.repository.CompaniesRepository;
@Service
public class ProfitService {
    
    @Autowired
    private ProfitRepository profitRepository;

    @Autowired
    private CompaniesRepository companyRepository;


    @Transactional
    public void createProfit(ProfitRequest profitRequest){
        if (profitRepository.existsByName(profitRequest.getName())) {
            throw new RuntimeException("Profit with the given name already exists");
        }

        Companies company = companyRepository.findById(profitRequest.getCompanyId())
                        .orElseThrow(() -> 
                        new RuntimeException("Company with the given ID does not exist")    
                    );
        profitRepository.save(
            Profit.builder()
            .company(company)
            .name(profitRequest.getName())
            .percentage(profitRequest.getPercentage())
            .priority(profitRequest.getPriority())
            .build()
        );
    }


    @Transactional
    public List<ProfitRequest> getAllListByCompanyId(UUID companyId){
        List<Profit> profit = profitRepository.findByCompanyId(companyId);
        return profit.stream()
            .map(item -> ProfitRequest.builder()
                    .id(item.getId())
                    .companyId(companyId)
                    .name(item.getName())
                    .percentage(item.getPercentage())
                    .build())
            .toList();
    }

    @Transactional
    public void deleteProfitByCompany(UUID id, UUID companyId){
        Profit profit = profitRepository
        .findByIdAndCompanyId(id, companyId)
            .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Paper not found with id: " + id
                    )
            );

            profitRepository.delete(profit);
    }

   @Transactional
    public void updateProfitById(ProfitRequest request){

        Profit profit = profitRepository.findById(request.getId())
            .orElseThrow(() -> new RuntimeException("Profit not found"));

        profit.setName(request.getName());
        profit.setPercentage(request.getPercentage());

        if (request.getCompanyId() != null) {
            profit.setCompany(
                companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"))
            );
        }

        profitRepository.save(profit);
    }
}


