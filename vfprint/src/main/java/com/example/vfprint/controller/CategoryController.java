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
     public ResponseEntity<String> createCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            categoryService.createCategory(categoryDTO);
            return ResponseEntity.ok("Category created successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
       
    }

    @GetMapping
    public CategoryDTO getCategoryByName(@RequestParam String name) {
        if (!categoryService.existsByName(name)) {
            throw new RuntimeException("Category with the given name does not exist");
        }
        // Assuming you have a method to fetch category details by name
        // return categoryService.getCategoryByName(name);
        return categoryService.getCategoryByName(name); // Placeholder for actual implementation
     }

}
