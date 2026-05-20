package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.example.vfprint.dto.PrintPriceDTO;
import com.example.vfprint.entity.PrintPrice;
import com.example.vfprint.repository.PrintPriceRepository;

@Service
public class PrintPriceService {
    
    @Autowired
    private PrintPriceRepository priceRepository;


    @Transactional
    public void createPrintPrice(PrintPriceDTO priceDTO){
        if (priceRepository.existsByName(priceDTO.getName())) {
            throw new RuntimeException("Print price with the given name already exists");
        }

        priceRepository.save(
            PrintPrice.builder()
            .companyId(priceDTO.getCompanyId())
            .name(priceDTO.getName())
            .price(priceDTO.getPrice())
            .is_active(priceDTO.isActive())
            .build()
        );
    }


    @Transactional
    public List<PrintPriceDTO> getAllByComapnyId(Long companyId){
        List<PrintPrice> lPrices = priceRepository.findByCompanyId(companyId);
        if (lPrices.isEmpty()) {
            throw new RuntimeException("Print price with the given company id does not exist");
        }
        return lPrices.stream().map( item -> PrintPriceDTO.builder()
                                            .id(item.getId())
                                            .companyId(companyId)
                                            .name(item.getName())
                                            .price(item.getPrice())
                                            .isActive(item.getIs_active())
                                        .build()).toList();
    }

    @Transactional
    public void deletePrintPrice(Long id, Long companyId){
        PrintPrice printPrice = priceRepository
        .findByIdAndCompanyId(id, companyId)
        .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Paper not found with id: " + id
                    )
            );
        
        priceRepository.delete(printPrice);
    }
}
