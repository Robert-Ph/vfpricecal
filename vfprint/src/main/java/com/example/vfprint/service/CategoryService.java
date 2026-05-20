package com.example.vfprint.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.CategoryDTO;
import com.example.vfprint.dto.ProcessingDTO;
import com.example.vfprint.dto.response.CategoryResponse;
import com.example.vfprint.dto.response.ProcessingResponse;
import com.example.vfprint.entity.Category;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.repository.CategoryRepository;
import com.example.vfprint.repository.ProcessingRepository;

import java.util.List;
@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProcessingRepository  processingRepository;

    @Transactional
    public void deleteCategoryByName(String name){
        categoryRepository.deleteByName(name);
    }

     @Transactional
    public boolean existsByName(String name){
        return categoryRepository.existsByName(name);
    }

    @Transactional
    public void createCategory(CategoryDTO categoryDTO){
        if (categoryRepository.existsByName(categoryDTO.getName())) {
            throw new RuntimeException("Category with the given name already exists");
        }
        categoryRepository.save(Category.builder()
                .companyId(categoryDTO.getCompanyId())
                .name(categoryDTO.getName())
                .is_active(true)
                .build());
       
    }

    @Transactional
    public CategoryDTO getCategoryByName(String name){
        Category category = categoryRepository.findByName(name);
        if (category == null) {
            throw new RuntimeException("Category with the given name does not exist");
        }
        CategoryDTO dto = new CategoryDTO();
        dto.setCompanyId(category.getCompanyId());
       dto.setName(category.getName());
        return dto;
    }

    @Transactional
    public CategoryDTO getCategoryById(Long id){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category with the given id does not exist"));
        CategoryDTO dto = new CategoryDTO();
        dto.setCompanyId(category.getCompanyId());
       dto.setName(category.getName());
        return dto;
    }

    @Transactional
    public void updateCategory(Long id, CategoryDTO categoryDTO){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category with the given id does not exist"));
        if (categoryRepository.existsByName(categoryDTO.getName()) && !category.getName().equals(categoryDTO.getName())) {
            throw new RuntimeException("Category with the given name already exists");
        }
        category.setCompanyId(categoryDTO.getCompanyId());
        category.setName(categoryDTO.getName());
        categoryRepository.save(category);
    }


    @Transactional
    public void deleteCategoryById(Long id){
        categoryRepository.deleteById(id);
    }

    @Transactional
    public List<CategoryDTO> getProcessingByCompanyId(Long companyId){
        List<Category> categories = categoryRepository.findByCompanyId(companyId);
        if (categories.isEmpty()) {
            throw new RuntimeException("Category with the given company id does not exist");
        }
        return categories.stream().map(category -> CategoryDTO.builder()
                .id(category.getId())
                .companyId(category.getCompanyId())
                .name(category.getName())
                .build()).toList();
    }


    @Transactional
    public CategoryResponse getAllProcessingByCategories(Long id){
        Category categories = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category with the given id does not exist"));
        List<Processing> processings = processingRepository.findByCategoryId(categories.getId());

        return CategoryResponse.builder()
                .id(categories.getId())
                .companyId(categories.getCompanyId())
                .name(categories.getName())
                .processings(processings.stream()
                        .map(processing -> ProcessingResponse.builder()
                            .id(processing.getId())
                            .name(processing.getName())
                            .price(processing.getPrice())
                            .build())
                        .toList())
                .build();
    }

    @Transactional
    public void deleteAllProcessingByCompany(Long id, Long companyId){
        Category category = categoryRepository
        .findByIdAndCompanyId(id, companyId)
        .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Paper not found with id: " + id
                    )
            );

        processingRepository.deleteByCategoryId(id);

        categoryRepository.delete(category);
    }

}


