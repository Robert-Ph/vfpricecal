package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import com.example.vfprint.repository.DiscountRangeRepository;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.dto.request.DiscountRangeRequest;
import com.example.vfprint.entity.DiscountRange;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiscountRangeService {
    
    private final DiscountRangeRepository discountRangeRepository;

    @Transactional
    public void createPrintPriceRange(List<DiscountRangeRequest> ranges, UUID discountId) {
        if (ranges == null || ranges.isEmpty()) {
            return;
        }
        for (DiscountRangeRequest range : ranges) {
            discountRangeRepository.save(
                DiscountRange.builder()
                    .discountId(discountId)
                    .maxAmount(range.getMaxAmount())
                    .discount(range.getDiscount())
                    .build()
            );
        }

       
    }


   @Transactional()
    public List<DiscountRangeRequest> getAllDiscountByDiscountId(UUID discountId) {
        return discountRangeRepository.findByDiscountId(discountId)
            .stream()
            .map(item -> DiscountRangeRequest.builder()
                    .id(item.getId())
                    .discountId(item.getDiscountId())
                    .maxAmount(item.getMaxAmount())
                    .discount(item.getDiscount())
                    .build())
            .toList();
    }

    @Transactional
    public void createDiscountRangeByDiscountId(DiscountRangeRequest request){
        if(discountRangeRepository.existsByMaxAmount(request.getMaxAmount())){
            return ;
        }

        discountRangeRepository.save(
            DiscountRange.builder()
            .discountId(request.getDiscountId())
            .maxAmount(request.getMaxAmount())
            .discount(request.getDiscount())
            .build()
        );
    
    }

    @Transactional
    public void updateDiscountRangeById(DiscountRangeRequest request){
        if(!discountRangeRepository.existsById(request.getId())){
            return;
        }

        discountRangeRepository.save(
            DiscountRange.builder()
            .id(request.getId())
            .discountId(request.getDiscountId())
            .maxAmount(request.getMaxAmount())
            .discount(request.getDiscount())
            .build()
        );
    }

    @Transactional
    public void deleteDiscountById(UUID id){
        discountRangeRepository.deleteById(id);
    }

}
