package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.request.ProfitRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.ProfitService;

@RestController
@RequestMapping("/api/profit")
public class ProfitController {

    @Autowired
    private ProfitService profitService;

    @PostMapping
    public ResponseEntity<ApiResponse> createProfitByCompanyId(@RequestBody ProfitRequest profitRequest){
        profitService.createProfit(profitRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Successfully")
            .data(profitRequest)
            .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProfitByCompany(@RequestParam Long companyId){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Get all profit by company")
            .data(profitService.getAllListByCompanyId(companyId))
            .build()
        );
    }
    
}
