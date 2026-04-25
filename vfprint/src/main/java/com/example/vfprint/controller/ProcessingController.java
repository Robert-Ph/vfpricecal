package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.ProcessingDTO;
import com.example.vfprint.service.ProcessingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/processing")
public class ProcessingController {
    
    @Autowired
    private ProcessingService processingService;


    @PostMapping
    public ResponseEntity<String> createProcessingbyCategory(@RequestBody ProcessingDTO processingDTO){
        processingService.createProcessing(processingDTO);
        return ResponseEntity.ok("Processing created successfully");
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

     @PostMapping("/delete")
     public ResponseEntity<String> deleteProcessingByName(@RequestParam String name) {
        processingService.deleteProcessingByName(name);
        return ResponseEntity.ok("Processing with name '" + name + "' has been deleted.");
     }
    

}
