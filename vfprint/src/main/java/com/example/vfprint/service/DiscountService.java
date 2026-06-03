package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.dto.DiscountDTO;
import com.example.vfprint.dto.request.DiscountRangeRequest;
import com.example.vfprint.dto.request.DiscountRequest;
import com.example.vfprint.entity.Discount;
import com.example.vfprint.repository.DiscountRepository;

@Service
public class DiscountService {
    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private DiscountRangeService discountRangeService;


    @Transactional
    public void createDiscountByCompany(DiscountRequest discountDTO){
        if (discountRepository.existsByNameAndCompanyId(discountDTO.getName(), discountDTO.getCompanyId())) {
            throw new RuntimeException("Discount with the given name already exists");
        }

        Discount discount = discountRepository.save(
            Discount.builder()
            .company(Companies.builder().id(discountDTO.getCompanyId()).build())
            .name(discountDTO.getName())
            .isActive(discountDTO.isActive())
            .priority(discountDTO.getPriority())
            .build()
        );

        List<DiscountRangeRequest> range = discountDTO.getDiscountRanges();
        if (!range.isEmpty() && range != null) {
            discountRangeService.createPrintPriceRange(range, discount.getId());
        } 


    }

    @Transactional(readOnly = true)
    public List<DiscountDTO> getAllDiscountByCompany(UUID companyId){
        List<Discount> dList = discountRepository.findByCompanyId(companyId);
        return dList.stream().map(item -> DiscountDTO.builder()
                                    .id(item.getId())
                                    .companyId(item.getCompany().getId())
                                    .name(item.getName())
                                    // .discount(item.getDiscount())
                                 
                                    .build()
                                ).toList();

    }

    @Transactional
    public void deleteDiscount(UUID id, UUID companyId){
        Discount discount = discountRepository
            .findByIdAndCompanyId(id, companyId)
            .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Paper not found with id: " + id
                    )
            );

        discountRepository.delete(discount);
    }

}
