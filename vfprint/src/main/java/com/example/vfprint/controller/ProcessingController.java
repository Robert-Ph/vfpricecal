package com.example.vfprint.controller;

import com.example.vfprint.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

import com.example.vfprint.dto.ProcessingDTO;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.ProcessingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/processing")
public class ProcessingController {
    
    
    @Autowired
    private ProcessingService processingService;

    @Autowired
    private CategoryService categoryService;





    @PostMapping
    public ResponseEntity<ApiResponse> createProcessingbyCategory(@RequestBody ProcessingDTO processingDTO){
        processingService.createProcessing(processingDTO);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse
            .builder()
            .code(200)
            .data(processingDTO)
            .message("Paper created successfully")
            .build()
        );
    }


    
    @PostMapping("/list")
    public ResponseEntity<String> postMethodName(@RequestBody List<ProcessingDTO> processingDTOList) {
        processingService.createProcessingByCategoryId(processingDTOList);
        return ResponseEntity.ok("Processing list created successfully");
    }
    
    @GetMapping
    public ProcessingDTO getProcessingByName(@RequestParam String name) {
        if (!processingService.existsByName(name)) {
            throw new RuntimeException("Processing with the given name does not exist");
        }
        // Assuming you have a method to fetch processing details by name
        // return processingService.getProcessingByName(name);
        return processingService.getProcessingByName(name); // Placeholder for actual implementation
     }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProcessingById(@PathVariable UUID id) {
        return ResponseEntity.ok(
            ApiResponse
            .builder()
            .code(200)
            .message("Processing retrieved successfully")
            .data(categoryService.getAllProcessingByCategories(id))
            .build()
        );
       
     }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProcessingByCategory(@PathVariable UUID id, @RequestParam UUID categoryId){
        processingService.deleteProcessingByCategory(id, categoryId);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Delete processing by category successfully")
            .build()
        );
    }
    
    

}
