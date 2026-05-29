package com.example.vfprint.service;

import com.example.vfprint.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.example.vfprint.repository.ProcessingRepository;
import com.example.vfprint.dto.ProcessingDTO;
import com.example.vfprint.entity.Processing;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.entity.Category;

@Service
public class ProcessingService {
    
    private final CategoryRepository categoryRepository;
    @Autowired
    private ProcessingRepository processingRepository;

    ProcessingService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

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
    public void createProcessing(ProcessingDTO processingDTO){
        if (categoryRepository.findById(processingDTO.getCategoryId()).isEmpty()) {
            throw new RuntimeException("Category with the given ID does not exist");
        }
        if (processingRepository.existsByName(processingDTO.getName())) {
            throw new RuntimeException("Processing with the given name already exists");
        }
        processingRepository.save(Processing.builder()
                .category(Category.builder().id(processingDTO.getCategoryId()).build())
                .name(processingDTO.getName())
                .price(processingDTO.getPrice())
                .is_active(true)
                .build());
    }

    //tạo mới processing theo categoryId, với đầu vào là 1 danh sách các processingDTO, nếu categoryId không tồn tại thì throw exception, nếu name đã tồn tại thì throw exception
    @Transactional
    public void createProcessingByCategoryId( List<ProcessingDTO> processingDTOList){
        for (ProcessingDTO processingDTO : processingDTOList) {
            if (categoryRepository.findById(processingDTO.getCategoryId()).isEmpty()) {
                throw new RuntimeException("Category with the given ID does not exist");
            }
            if (processingRepository.existsByName(processingDTO.getName())) {
                throw new RuntimeException("Processing with the given name already exists");
            }
            processingRepository.save(Processing.builder()
                    .category(Category.builder().id(processingDTO.getCategoryId()).build())
                    .name(processingDTO.getName())
                    .price(processingDTO.getPrice())
                    .is_active(true)
                    .build());
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
        dto.setPrice(processing.getPrice());
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
        dto.setPrice(processing.getPrice());
    
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
}
