package com.example.vfprint.controller;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.vfprint.config.Code;
import com.example.vfprint.dto.CategoryDTO;
import com.example.vfprint.dto.response.ApiResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    
    private final CategoryService categoryService;

     @PostMapping
     public ResponseEntity<ApiResponse> createCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            categoryService.createCategory(categoryDTO, false);
            return ResponseEntity.ok(
                ApiResponse
                .builder()
                .code(Code.SUCCESS)
                .message("Category created successfully")
                .data(categoryDTO)
                .build()
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                ApiResponse
                .builder()
                .code(Code.CONFLICT)
                .message(e.getMessage())
                .build()
            );
        }
       
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getCategoryByCompanyId(@RequestParam UUID companyId) {
        // Assuming you have a method to fetch category details by id
        return ResponseEntity.ok(
            ApiResponse
            .builder()
            .code(200) // Placeholder for actual implementation
            .data(categoryService.getProcessingByCompanyId(companyId)) // Placeholder for actual implementation
            .message("Category retrieved successfully")
            .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteByCompany(@PathVariable UUID id, @RequestParam UUID companyId){
        categoryService.deleteAllProcessingByCompany(id, companyId);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("delete successfully")
            .build()
        );
    }



}
