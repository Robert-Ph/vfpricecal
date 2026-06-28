package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

import com.example.vfprint.dto.request.ProfitItemRequest;
import com.example.vfprint.dto.request.ProfitRequest;
import com.example.vfprint.dto.response.ProfitItemResponse;
import com.example.vfprint.dto.response.ProfitResponse;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.repository.ProfitRepository;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.repository.CompaniesRepository;
@Service
@RequiredArgsConstructor
public class ProfitService {
    

    private final ProfitRepository profitRepository;
    private final ProfitItemService itemService;
    private final CompaniesRepository companyRepository;


    @Transactional
    public void createProfit(ProfitRequest profitRequest){
        if (profitRepository.existsByName(profitRequest.getName())) {
            throw new RuntimeException("Profit with the given name already exists");
        }

        Companies company = companyRepository.findById(profitRequest.getCompanyId())
                        .orElseThrow(() -> 
                        new RuntimeException("Company with the given ID does not exist")    
                    );
        Profit profit = profitRepository.save(
            Profit.builder()
            .company(company)
            .name(profitRequest.getName())
            .priority(profitRequest.getPriority())
            .build()
        );

        itemService.createProfitItem(profitRequest.getItemList(), profit.getId());
        

    }


    @Transactional
    public List<ProfitResponse> getAllListByCompanyId(UUID companyId) {
        List<Profit> profits = profitRepository.findByCompanyId(companyId);

        return profits.stream()
            .map(profit -> {

                List<ProfitItemResponse> items = itemService.getProfitItem(profit);

                return ProfitResponse.builder()
                        .id(profit.getId())
                        .companyId(companyId)
                        .name(profit.getName())
                        .itemList(items)
                        .build();
            })
            .toList();
    }

        @Transactional
    public ProfitResponse getById(UUID id) {
        Profit profits = profitRepository.findById(id).orElseThrow();
        List<ProfitItemResponse> items = itemService.getProfitItem(profits); 

        return ProfitResponse.builder()
                 .id(profits.getId())
                 .companyId(profits.getCompany().getId())
                 .name(profits.getName())
                 .itemList(items)
                 .priority(profits.getPriority())
                 .build();
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
        // profit.setPercentage(request.getPercentage());

        if (request.getCompanyId() != null) {
            profit.setCompany(
                companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"))
            );
        }

        profitRepository.save(profit);
    }
}


