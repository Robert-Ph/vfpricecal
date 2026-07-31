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
import com.example.vfprint.entity.DiscountRange;
import com.example.vfprint.repository.DiscountRangeRepository;
import com.example.vfprint.repository.DiscountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiscountService {

    private final DiscountRepository discountRepository;

    private final DiscountRangeService discountRangeService;

    private final DiscountRangeRepository discountRangeRepository;



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

    @Transactional
    public DiscountRequest getDiscountRangeByDiscountId(UUID disUuid){
        List<DiscountRangeRequest> discountRequests = discountRangeService.getAllDiscountByDiscountId(disUuid);
        Discount discount = discountRepository.findDiscountById(disUuid);

        return DiscountRequest.builder()
            .id(discount.getId())
            .companyId(discount.getCompany().getId())
            .name(discount.getName())
            .isActive(discount.isActive())
            .priority(discount.getPriority())
            .discountRanges(discountRequests)
            .build();


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

        List<DiscountRange> discountRanges = discountRangeRepository.findByDiscountId(id);
        discountRangeRepository.deleteAll(discountRanges);

        discountRepository.delete(discount);
    }

}
