package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.service.CategoryService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.vfprint.dto.CategoryDTO;
import com.example.vfprint.dto.response.ApiResponse;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @DeleteMapping
    public String deleteCategoryByName(@RequestParam String name) {
        categoryService.deleteCategoryByName(name);
        return "Category with name '" + name + "' has been deleted.";
     }

     @PostMapping
     public ResponseEntity<ApiResponse> createCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            categoryService.createCategory(categoryDTO);
            return ResponseEntity.ok(
                ApiResponse
                .builder()
                .code(200)
                .message("Category created successfully")
                .data(categoryDTO)
                .build()
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                ApiResponse
                .builder()
                .code(400)
                .message(e.getMessage())
                .build()
            );
        }
       
    }

    // @GetMapping
    // public CategoryDTO getCategoryByName(@RequestParam String name) {
    //     if (!categoryService.existsByName(name)) {
    //         throw new RuntimeException("Category with the given name does not exist");
    //     }
    //     // Assuming you have a method to fetch category details by name
    //     // return categoryService.getCategoryByName(name);
    //     return categoryService.getCategoryByName(name); // Placeholder for actual implementation
    //  }

    @GetMapping
    public ResponseEntity<ApiResponse> getCategoryByCompanyId(@RequestParam Long companyId) {
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

}
