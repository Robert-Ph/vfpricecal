package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

import com.example.vfprint.dto.DiscountDTO;
import com.example.vfprint.entity.Discount;
import com.example.vfprint.entity.Paper;
import com.example.vfprint.repository.DiscountRepository;

@Service
public class DiscountService {
    @Autowired
    private DiscountRepository discountRepository;

    @Transactional
    public void createDiscountByCompany(DiscountDTO discountDTO){
        if (discountRepository.existsByNameAndCompanyId(discountDTO.getName(), discountDTO.getCompanyId())) {
            throw new RuntimeException("Discount with the given name already exists");
        }

        discountRepository.save(
            Discount.builder()
            .companyId(discountDTO.getCompanyId())
            .name(discountDTO.getName())
            .discount(discountDTO.getDiscount())
            .build()
        );
    }

    @Transactional(readOnly = true)
    public List<DiscountDTO> getAllDiscountByCompany(UUID companyId){
        List<Discount> dList = discountRepository.findByCompanyId(companyId);
        return dList.stream().map(item -> DiscountDTO.builder()
                                    .id(item.getId())
                                    .companyId(item.getCompanyId())
                                    .name(item.getName())
                                    .discount(item.getDiscount())
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
