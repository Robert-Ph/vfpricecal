package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.config.Code;
import com.example.vfprint.dto.CategoryDTO;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.dto.response.CategoryResponse;
import com.example.vfprint.dto.response.ProcessingResponse;
import com.example.vfprint.entity.Category;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.enums.ActionLog;
import com.example.vfprint.enums.LevelLog;
import com.example.vfprint.enums.StatusLog;
import com.example.vfprint.repository.CategoryRepository;
import com.example.vfprint.repository.ProcessingRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final LogUserService logUserService;
    private final ProcessingRepository processingRepository;
    private final CompaniesService companiesService;

    @Transactional
    public void deleteCategoryByName(String name){
        categoryRepository.deleteByName(name);
    }


    @Transactional
    public Category createCategory(CategoryDTO categoryDTO, Boolean canDelete){

        try {
            Companies companies = companiesService.getCompany(categoryDTO.getCompanyId());
            if (categoryRepository.existsByNameAndCompany(categoryDTO.getName(), companies)) {
                throw new RuntimeException("Category with the given name already exists");
            }
            Category result = categoryRepository.save(Category.builder()
                .company(companies)
                .name(categoryDTO.getName())
                .canDelete(canDelete)
                .isSystem(true)
                .is_active(true)
                .build());

             logUserService.createLogUser(
                categoryDTO.getCompanyId(),
                LevelLog.INFO,
                ActionLog.CREATE,
                categoryDTO.getAccountId(),
                "Tạo danh mục mới thành công: " + categoryDTO.getName(),
                StatusLog.Success
            );
        
        return result;
        }catch(RuntimeException e){
            logUserService.createLogUser(
                categoryDTO.getCompanyId(),
                LevelLog.INFO,
                ActionLog.CREATE,
                categoryDTO.getAccountId(),
                "Tạo danh mục mới thất bại: " + categoryDTO.getName(),
                StatusLog.Failed
            );

            return null;
        } catch (Exception e) {
            // TODO: handle exception
            
             logUserService.createLogUser(
                categoryDTO.getCompanyId(),
                LevelLog.INFO,
                ActionLog.CREATE,
                categoryDTO.getAccountId(),
                "Tạo danh mục mới thất bại: " + categoryDTO.getName(),
                StatusLog.Failed
            );
        
            throw e;
        }
       
    }

    @Transactional
    public CategoryDTO getCategoryByName(String name){
        Category category = categoryRepository.findByName(name);
        if (category == null) {
            throw new RuntimeException("Category with the given name does not exist");
        }
        CategoryDTO dto = new CategoryDTO();
        dto.setCompanyId(category.getCompany().getId());
       dto.setName(category.getName());
        return dto;
    }

    @Transactional
    public CategoryDTO getCategoryById(UUID id){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category with the given id does not exist"));
        CategoryDTO dto = new CategoryDTO();
        dto.setCompanyId(category.getCompany().getId());
       dto.setName(category.getName());
        return dto;
    }

    @Transactional
    public ApiResponse updateCategory(UUID id, CategoryDTO categoryDTO){
        try {
            Companies companies = companiesService.getCompany(categoryDTO.getCompanyId());

            Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category with the given id does not exist"));
            
            if (!categoryRepository.existsByNameAndCompany(categoryDTO.getName(), companies)) {
                throw new RuntimeException("Category with the given name already exists");
            }
            category.setCompany(Companies.builder().id(categoryDTO.getCompanyId()).build());
            category.setName(categoryDTO.getName());
            categoryRepository.save(category);

            logUserService.createLogUser(
                categoryDTO.getCompanyId(),
                LevelLog.INFO,
                ActionLog.UPDATE,
                categoryDTO.getAccountId(),
                "Cập nhật danh mục mới thành công: " + categoryDTO.getName(),
                StatusLog.Success
            );

            return ApiResponse.builder()
                    .code(Code.SUCCESS)
                    .message("Cập nhật danh mục thành công!")
                    .build();

        } catch (Exception e) {
            logUserService.createLogUser(
                categoryDTO.getCompanyId(),
                LevelLog.INFO,
                ActionLog.UPDATE,
                categoryDTO.getAccountId(),
                "Cập nhật danh mục mới thất bại: " + categoryDTO.getName(),
                StatusLog.Failed
            );

            return ApiResponse.builder()
                    .code(Code.CONFLICT)
                    .message("Cập nhật danh mục thất bại!")
                    .build();
        }
        
    }


    @Transactional
    public void deleteCategoryById(UUID id){
        categoryRepository.deleteById(id);
    }

    @Transactional
    public List<CategoryDTO> getProcessingByCompanyId(UUID companyId){
        List<Category> categories = categoryRepository.findByCompanyId(companyId);
        return categories.stream().map(category -> CategoryDTO.builder()
                .id(category.getId())
                .companyId(category.getCompany().getId())
                .name(category.getName())
                .canDelete(category.getCanDelete())
                .build()).toList();
    }


    @Transactional
    public CategoryResponse getAllProcessingByCategories(UUID id){
        Category categories = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category with the given id does not exist"));
        List<Processing> processings = processingRepository.findByCategoryId(categories.getId());

        return CategoryResponse.builder()
                .id(categories.getId())
                .companyId(categories.getCompany().getId())
                .canDelete(categories.getCanDelete())
                .name(categories.getName())
                .processings(processings.stream()
                        .map(processing -> ProcessingResponse.builder()
                            .id(processing.getId())
                            .name(processing.getName())
                            .unit(processing.getUnit())
                            .build())
                        .toList())
                .build();
    }

    @Transactional
    public void deleteAllProcessingByCompany(UUID id, UUID companyId){
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


