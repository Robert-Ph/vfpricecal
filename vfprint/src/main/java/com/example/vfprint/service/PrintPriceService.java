package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.dto.request.PrintPriceRangeRequest;
import com.example.vfprint.dto.PrintPriceDTO;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.PrintPrice;
import com.example.vfprint.entity.PrintPriceRange;
import com.example.vfprint.repository.PrintPriceRangeRepository;
import com.example.vfprint.repository.PrintPriceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrintPriceService {

    private final PrintPriceRepository priceRepository;

    private final PrintPriceRangeService printPriceRangeService;

    private final PrintPriceRangeRepository printPriceRangeRepository;


    @Transactional
    public void createPrintPrice(PrintPriceDTO priceDTO){
        if (priceRepository.existsByName(priceDTO.getName())) {
            throw new RuntimeException("Print price with the given name already exists");
        }

        
        PrintPrice savedPrice = priceRepository.save(
            PrintPrice.builder()
            .company(Companies.builder().id(priceDTO.getCompanyId()).build())
            .name(priceDTO.getName())
            .unit(priceDTO.getUnit())
            .is_active(priceDTO.isActive())
            .build()
        );

        // Sau khi lưu PrintPrice, chúng ta cần lưu các PrintPriceRange liên quan
        List<PrintPriceRangeRequest> ranges = priceDTO.getPrintPriceRanges();
        if (ranges != null && !ranges.isEmpty()) {
            printPriceRangeService.createPrintPriceRange(ranges, savedPrice.getId());
        }

    }


    @Transactional
    public List<PrintPriceDTO> getAllByCompanyId(UUID companyId){
        List<PrintPrice> lPrices = priceRepository.findByCompanyId(companyId);
        return lPrices.stream().map( item -> PrintPriceDTO.builder()
                                            .id(item.getId())
                                            .companyId(companyId)
                                            .name(item.getName())
                                            .unit(item.getUnit())
                                            .isActive(item.getIs_active())
                                            .printPriceRanges(List.of())
                                        .build()).toList();
    }

    @Transactional
    public PrintPriceDTO getById(UUID id){
        PrintPrice printPrice = priceRepository.findById(id)
        .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Print price not found with id: " + id
                    )
            );

        List<PrintPriceRangeRequest> lRanges = printPriceRangeService.getAllByPrintPriceId(id);
        return PrintPriceDTO.builder()
                .id(printPrice.getId())
                .companyId(printPrice.getCompany().getId())
                .name(printPrice.getName())
                .unit(printPrice.getUnit())
                .isActive(printPrice.getIs_active())
                .printPriceRanges(lRanges)
                .build();
    }

    @Transactional
    public void deletePrintPrice(UUID id, UUID companyId){
        PrintPrice printPrice = priceRepository
        .findByIdAndCompanyId(id, companyId)
        .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Paper not found with id: " + id
                    )
            );

        List<PrintPriceRange> ranges = printPriceRangeRepository.findByPrintPriceId(id);

        printPriceRangeRepository.deleteAll(ranges);
        
        priceRepository.delete(printPrice);
    }
}
