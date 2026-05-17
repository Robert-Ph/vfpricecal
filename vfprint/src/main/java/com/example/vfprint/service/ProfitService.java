package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.example.vfprint.dto.request.ProfitRequest;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.repository.ProfitRepository;

@Service
public class ProfitService {
    
    @Autowired
    private ProfitRepository profitRepository;

    @Transactional
    public void createProfit(ProfitRequest profitRequest){
        if (profitRepository.existsByName(profitRequest.getName())) {
            throw new RuntimeException("Profit with the given name already exists");
        }

        profitRepository.save(
            Profit.builder()
            .companyId(profitRequest.getCompanyId())
            .name(profitRequest.getName())
            .percentage(profitRequest.getPercentage())
            .build()
        );
    }


    @Transactional
    public List<ProfitRequest> getAllListByCompanyId(Long companyId){
        List<Profit> profit = profitRepository.findByCompanyId(companyId);
        if (profit.isEmpty()) {
            throw new RuntimeException("Profit with the given company id does not exist");
        }
        return profit.stream().map(item -> ProfitRequest.builder()
                .id(item.getId())
                .companyId(item.getCompanyId())
                .name(item.getName())
                .percentage(item.getPercentage())
                .build()).toList();
    }
}
