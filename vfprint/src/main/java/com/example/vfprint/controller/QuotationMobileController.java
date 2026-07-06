package com.example.vfprint.controller;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.InfoPriceDTO;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.CalculatorService;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.vfprint.service.QuatationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bao-gia")
public class QuotationMobileController {
    
    private final CalculatorService calculatorService;
    private final QuatationService quatationService;


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

    @GetMapping("/{companyId}")
    public ResponseEntity<ApiResponse> getAllPapers(@PathVariable("companyId") UUID companyId){
        return ResponseEntity.ok(
            ApiResponse
            .builder()
            .code(200)
            .message("Papers retrieved successfully")
            .data(quatationService.getQuatationByCompanyId(companyId))
            .build()
        );
    }
}
