package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.repository.PrintPriceRangeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.function.Function;
import java.util.Set;
import java.util.Map;
import com.example.vfprint.dto.request.PrintPriceRangeRequest;
import com.example.vfprint.dto.PrintPriceDTO;
import com.example.vfprint.entity.PrintPrice;
import com.example.vfprint.entity.PrintPriceRange;
import jakarta.transaction.Transactional;
import com.example.vfprint.repository.PrintPriceRepository;
@Service
public class PrintPriceRangeService {
    
    @Autowired
    private PrintPriceRangeRepository printPriceRangeRepository;

    @Autowired
    private PrintPriceRepository printPriceRepository;

    @Transactional
    public List<PrintPriceRangeRequest> getAllByPrintPriceId(UUID printPriceId){
        List<PrintPriceRange> lRanges = printPriceRangeRepository.findByPrintPriceId(printPriceId);
        return lRanges.stream().map( item -> PrintPriceRangeRequest.builder()
                                            .id(item.getId())
                                            .printPriceId(printPriceId)
                                            .minLengthCm(item.getMinLengthCm())
                                            .maxLengthCm(item.getMaxLengthCm())
                                            .pricePerMeter(item.getPricePerMeter())
                                        .build()).toList();
    }

   @Transactional
public void createPrintPriceRange(List<PrintPriceRangeRequest> rangeDTO, UUID printPriceId) {
    if (rangeDTO == null || rangeDTO.isEmpty()) return;

    // 2. Duyệt qua từng item để kiểm tra logic và chuẩn bị lưu
    List<PrintPriceRange> rangesToSave = new ArrayList<>();

    for (PrintPriceRangeRequest item : rangeDTO) {
        // Kiểm tra xem PrintPrice có tồn tại không
        PrintPrice printPrice = printPriceRepository.findById(printPriceId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Print price not found for ID: " + printPriceId)
                );

        // 3. Logic check Overlap chuẩn: Khoảng mới (min, max) giao với bất kỳ khoảng nào đã có trong DB
        // Công thức SQL: db.minLength <= item.maxLength AND db.maxLength >= item.minLength
        boolean isOverlapped = printPriceRangeRepository
                .existsByPrintPriceIdAndMinLengthCmLessThanEqualAndMaxLengthCmGreaterThanEqual(
                        printPriceId, 
                        item.getMaxLengthCm(), // Đổi chỗ: db.min <= item.max
                        item.getMinLengthCm()  // Đổi chỗ: db.max >= item.min
                );

        if (isOverlapped) {
            throw new RuntimeException("Print price range [" + item.getMinLengthCm() + " - " + item.getMaxLengthCm() + "] overlaps with an existing range.");
        }

        // 4. Sửa lại cú pháp Builder chuẩn của Lombok
        PrintPriceRange newRange = PrintPriceRange.builder()
                .printPrice(printPrice)
                .minLengthCm(item.getMinLengthCm())
                .maxLengthCm(item.getMaxLengthCm())
                .pricePerMeter(item.getPricePerMeter())
                .build();

        rangesToSave.add(newRange);
    }

    // 5. Tối ưu: Lưu tất cả trong 1 câu lệnh Batch Save thay vì lưu từng cái trong vòng lặp
    printPriceRangeRepository.saveAll(rangesToSave);
}
    
}
