package com.example.vfprint.service;

import com.example.vfprint.controller.AccountController;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.dto.request.ProfitItemRequest;
import com.example.vfprint.dto.response.ProfitItemResponse;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.entity.ProfitItem;
import com.example.vfprint.repository.ProfitItemRepository;
import com.example.vfprint.repository.ProfitRepository;

import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfitItemService {
    
    private final ProfitItemRepository profitItemRepository;
    private final ProfitRepository profitRepository;

    @Transactional
    public void createProfitItem(List<ProfitItemRequest> request, UUID id){

        List<ProfitItem> pItems = request.stream()
                                    .map(re -> {
                                       return ProfitItem.builder()
                                            .profit(profitRepository.findById(id).orElseThrow())
                                            .name(re.getName())
                                            .percent(re.getPercent())
                                            .build();  
                                    }).toList();

        profitItemRepository.saveAll(pItems);
    }

    @Transactional
    public List<ProfitItemResponse> getProfitItem(Profit profit){
        List<ProfitItem> item = profitItemRepository.findByProfit(profit);
        return item.stream()
                .map(pro -> {
                  return  ProfitItemResponse.builder()
                        .id(pro.getId())
                        .profitId(pro.getProfit().getId())
                        .name(pro.getName())
                        .percent(pro.getPercent())
                        .build();

                }).toList();
    }

    @Transactional
    public ProfitItem updateProfitItem(ProfitItemRequest request){
        ProfitItem item = profitItemRepository.findById(request.getId()).orElseThrow();
        item.setName(request.getName());
        item.setPercent(request.getPercent());

        return profitItemRepository.save(item);
    }


}
