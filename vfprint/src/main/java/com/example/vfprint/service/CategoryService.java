package com.example.vfprint.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.CategoryDTO;
import com.example.vfprint.entity.Category;
import com.example.vfprint.repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

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


}
