package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;
import com.example.vfprint.dto.quotation.QuatationResquest;
import com.example.vfprint.dto.response.PaperResponse;
import java.util.List;
import com.example.vfprint.dto.quotation.PaperQuatation;
import com.example.vfprint.dto.quotation.PrintPriceQuatation;
import com.example.vfprint.dto.quotation.ProcessingQuatation;
import com.example.vfprint.repository.ProcessingRepository;
import java.util.ArrayList;
import com.example.vfprint.dto.quotation.PaperSizeQuatation;
import com.example.vfprint.dto.quotation.CategoryQuatation;
import com.example.vfprint.dto.CategoryDTO;

@Service
public class QuatationService {
    @Autowired
    private PrintPriceService printPriceService;

    @Autowired
    private PaperService paperService;

    @Autowired
    private PaperSizeService paperSizeService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProcessingRepository processingRepository;

    @Transactional
    public QuatationResquest getQuatationByCompanyId(UUID companyId) {
       
        // Lấy dữ liệu print price của công ty
       List<PrintPriceQuatation> printPriceQuatations = printPriceService.getAllByCompanyId(companyId).stream().map( item -> PrintPriceQuatation.builder()
                                            .id(item.getId())
                                            .name(item.getName())
                                            .price(item.getPrice())
                                        .build()).toList();

                                             // Lấy dữ liệu paper của công ty

        List<PaperQuatation> paperQuatations = new ArrayList<>();

        for (PaperResponse paper : paperService.getAllPapersByCompany(companyId)) {
            List<PaperSizeQuatation> paperSizeQuatations = paperSizeService.getPaperSizesByPaperId(paper.getId()).stream().map( item -> PaperSizeQuatation.builder()
                                            .id(item.getId())
                                            .width(item.getWidth())
                                            .height(item.getHeight())
                                        .build()).toList();
            paperQuatations.add(
                PaperQuatation.builder()
                .id(paper.getId())
                .name(paper.getName())
                .paperSizes(paperSizeQuatations)
                .build()
            );
        }
        
        List<CategoryQuatation> categoryQuatations = new ArrayList<>();
        // List<Processing> processings = processingRepository.findByCategoryId(categories.getId());
        for( CategoryDTO category : categoryService.getProcessingByCompanyId(companyId)){
            List<ProcessingQuatation> processingDTOs = processingRepository.findByCategoryId(category.getId()).stream().map( item -> ProcessingQuatation.builder()
                                            .id(item.getId())
                                            .name(item.getName())
                                        .build()).toList();
            categoryQuatations.add(
                CategoryQuatation.builder()
                .id(category.getId())
                .name(category.getName())
                .processings(processingDTOs)
                .build()
            );
        }

        return QuatationResquest.builder()
                .companyId(companyId)
                .printPrices(printPriceQuatations)
                .papers(paperQuatations)
                .categories(categoryQuatations)
                .build();
    }

}
