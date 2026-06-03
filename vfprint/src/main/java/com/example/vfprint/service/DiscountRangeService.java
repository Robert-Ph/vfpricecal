package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.repository.DiscountRangeRepository;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.dto.request.DiscountRangeRequest;
import com.example.vfprint.entity.DiscountRange;
import jakarta.transaction.Transactional;

@Service
public class DiscountRangeService {
    
    @Autowired
    private DiscountRangeRepository discountRangeRepository;

    @Transactional
    public void createPrintPriceRange(List<DiscountRangeRequest> ranges, UUID discountId) {
        if (ranges == null || ranges.isEmpty()) {
            return;
        }
        for (DiscountRangeRequest range : ranges) {
            discountRangeRepository.save(
                DiscountRange.builder()
                    .discountId(discountId)
                    .discountId(range.getDiscountId())
                    .maxAmount(range.getMaxQuantity())
                    .discount(range.getDiscount())
                    .build()
            );
        }

       
    }

}
