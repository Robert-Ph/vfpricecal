package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.service.CalculatorService;
import com.example.vfprint.dto.InfoPriceDTO;
import com.example.vfprint.dto.response.ApiResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {
    
    @Autowired
    private CalculatorService calculatorService;


    @PostMapping
    public ResponseEntity<ApiResponse> getMethodName(@RequestBody InfoPriceDTO infoPriceDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("successful")
            .data(calculatorService.calculatePrintingCost(infoPriceDTO))
            .build()
        );
    }
    

}
