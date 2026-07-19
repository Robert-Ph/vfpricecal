package com.example.vfprint.service;

import com.example.vfprint.repository.CategoryRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.example.vfprint.repository.ProcessingRepository;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.dto.ProcessingDTO;
import com.example.vfprint.dto.request.ProcessingRequest;
import com.example.vfprint.dto.response.ProcessingAndTierReponse;
import com.example.vfprint.dto.response.ProcessingTierReponse;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.entity.ProcessingTier;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.entity.Category;

@Service
@RequiredArgsConstructor
public class ProcessingService {
    
    private final CategoryRepository categoryRepository;
    private final ProcessingRepository processingRepository;
    private final ProcessingTierService processingTierService;

    @Transactional
    public void deleteProcessingByName(String name){
        processingRepository.deleteByName(name);
    }

     @Transactional
    public boolean existsByName(String name){
        return processingRepository.existsByName(name);
    }


    // tạo mới processing, nếu categoryId không tồn tại thì throw exception, nếu name đã tồn tại thì throw exception
    @Transactional
    public void createProcessing(ProcessingRequest processingDTO){
        if (categoryRepository.findById(processingDTO.getCategoryId()).isEmpty()) {
            throw new RuntimeException("Category with the given ID does not exist");
        }
        if (processingRepository.existsByName(processingDTO.getName())) {
            throw new RuntimeException("Processing with the given name already exists");
        }
        Processing processing = processingRepository.save(Processing.builder()
                .category(Category.builder().id(processingDTO.getCategoryId()).build())
                .name(processingDTO.getName())
                .unit(processingDTO.getUnit())
                .is_active(true)
                .build());
        
        processingTierService.createProcessingTierList(processingDTO.getPTierRequests(), processing);
        
    }

    //tạo mới processing theo categoryId, với đầu vào là 1 danh sách các processingDTO, nếu categoryId không tồn tại thì throw exception, nếu name đã tồn tại thì throw exception
    @Transactional
    public void createProcessingByCategoryId( List<ProcessingRequest> processingDTOList){
        for (ProcessingRequest processingDTO : processingDTOList) {
            if (categoryRepository.findById(processingDTO.getCategoryId()).isEmpty()) {
                throw new RuntimeException("Category with the given ID does not exist");
            }
            if (processingRepository.existsByName(processingDTO.getName())) {
                throw new RuntimeException("Processing with the given name already exists");
            }
            Processing processing = processingRepository.save(Processing.builder()
                    .category(Category.builder().id(processingDTO.getCategoryId()).build())
                    .name(processingDTO.getName())
                    .is_active(true)
                    .build());

            processingTierService.createProcessingTierList(processingDTO.getPTierRequests(), processing);
        }
    }

    // get thông tin processing theo name, trả về DTO
    @Transactional
    public ProcessingDTO getProcessingByName(String name){
        Processing processing = processingRepository.findByName(name);
        if (processing == null) {
            throw new RuntimeException("Processing with the given name does not exist");
        }
        ProcessingDTO dto = new ProcessingDTO();
        dto.setCategoryId(processing.getCategory().getId());
        dto.setName(processing.getName());
        return dto;
    }

    @Transactional(readOnly = true)
    public ProcessingDTO getProcessingById(UUID id) {
        Processing processing = processingRepository.findById(id).orElse(null);
    
        // Kiểm tra an toàn: Nếu null thì trả về null hoặc new ProcessingDTO() trống luôn
        if (processing == null) {
            return null; 
        }

        ProcessingDTO dto = new ProcessingDTO();
        dto.setCategoryId(processing.getCategory().getId());
        dto.setName(processing.getName());
    
        return dto;
    }

    @Transactional
    public void deleteProcessingByCategory(UUID id, UUID category){
        Processing processing = processingRepository
        .findByIdAndCategoryId(id, category)
        .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Processing not found with id: " + id
                    )
            );

        processingRepository.delete(processing);
    }

   @Transactional
public void updateProcessingById(ProcessingRequest dto) {

    Processing processing = processingRepository.findById(dto.getId())
        .orElseThrow(() -> new RuntimeException("Processing not found"));

    processing.setName(dto.getName());
    processing.setUnit(dto.getUnit());
    Category category = categoryRepository.findById(dto.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));
    processing.setCategory(category);


    processingTierService.updateProcessingTier(dto.getPTierRequests(), processing);
    processingRepository.save(processing); // optional vì @Transactional đã đủ
}

    @Transactional
    public ProcessingAndTierReponse getProcessingAndTierById(UUID id){
        Processing result = new Processing();
        result = processingRepository.findById(id).orElseThrow();

        List<ProcessingTier> tier = processingTierService.getAllByProcessingId(result);

        List<ProcessingTierReponse> tierResponses = tier.stream()
            .map(item -> ProcessingTierReponse.builder()
            .id(item.getId())
            .isActive(item.isActive())
            .processingId(id)
            .minVolume(item.getMinVolume())
            .maxVolume(item.getMaxVolume())
            .minCharge(item.getMinCharge())
            .price(item.getPrice())
            .build())
        .toList();

        return ProcessingAndTierReponse.builder()
                .id(id)
                .categoryId(result.getCategory().getId())
                .name(result.getName())
                .unit(result.getUnit())
                .tierReponses(tierResponses)
                .build();
        
    }
}
