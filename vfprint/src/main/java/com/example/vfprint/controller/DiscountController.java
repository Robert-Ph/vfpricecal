package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;

import com.example.vfprint.dto.DiscountDTO;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.DiscountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/discount")
public class DiscountController {
    
    @Autowired
    private DiscountService discountService;

    @PostMapping
    public ResponseEntity<ApiResponse> createDiscountByCompany(@RequestBody DiscountDTO discountDTO){
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
    public ResponseEntity<ApiResponse> getAllDiscountByCompany(@RequestParam Long companyId){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Get all discount by company successfully")
            .data(discountService.getAllDiscountByCompany(companyId))
            .build()
        );
    }
    
    
}
