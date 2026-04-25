package com.example.vfprint.service;

import com.example.vfprint.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.example.vfprint.repository.ProcessingRepository;
import com.example.vfprint.dto.ProcessingDTO;
import com.example.vfprint.entity.Processing;

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

    @Transactional
    public void createProcessing(ProcessingDTO processingDTO){
        if (categoryRepository.findById(processingDTO.getCategoryId()).isEmpty()) {
            throw new RuntimeException("Category with the given ID does not exist");
        }
        if (processingRepository.existsByName(processingDTO.getName())) {
            throw new RuntimeException("Processing with the given name already exists");
        }
        processingRepository.save(Processing.builder()
                .categoryId(processingDTO.getCategoryId())
                .name(processingDTO.getName())
                .price(processingDTO.getPrice())
                .is_active(true)
                .build());
    }

    @Transactional
    public ProcessingDTO getProcessingByName(String name){
        Processing processing = processingRepository.findByName(name);
        if (processing == null) {
            throw new RuntimeException("Processing with the given name does not exist");
        }
        ProcessingDTO dto = new ProcessingDTO();
        dto.setCategoryId(processing.getCategoryId());
        dto.setName(processing.getName());
        dto.setPrice(processing.getPrice());
        return dto;
    }
}
