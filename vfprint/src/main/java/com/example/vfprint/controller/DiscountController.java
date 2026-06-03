package com.example.vfprint.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.request.DiscountRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.DiscountService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/discount")
public class DiscountController {
    
    @Autowired
    private DiscountService discountService;

    @PostMapping
    public ResponseEntity<ApiResponse> createDiscountByCompany(@RequestBody DiscountRequest discountDTO){
            discountService.createDiscountByCompany(discountDTO);
            return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.builder()
                .code(200)
                .message(" create discount successfully")
                .data(discountDTO)
                .build()
            );
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllDiscountByCompany(@RequestParam UUID companyId){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Get all discount by company successfully")
            .data(discountService.getAllDiscountByCompany(companyId))
            .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDiscount(@PathVariable UUID id, @RequestParam("companyId") UUID companyId){
        discountService.deleteDiscount(id, companyId);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Delete discount successfully")
            .build()
        );
    }
    

    
}
