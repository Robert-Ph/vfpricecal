package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.PrintPriceDTO;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.PrintPriceService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("api/print-price")
public class PrintPriceController {
    
    @Autowired
    private PrintPriceService priceService;


    @PostMapping
    public ResponseEntity<ApiResponse> createPrintPrice(@RequestBody PrintPriceDTO priceDTO){
        priceService.createPrintPrice(priceDTO);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Print Price create successfuly")
            .data(priceDTO)
            .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllPrintPriceByCompany(@RequestParam Long companyId){
            return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.builder()
                .code(200)
                .message("Get all success by company")
                .data(priceService.getAllByComapnyId(companyId))
                .build()
            );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteByCompany(@PathVariable Long id, @RequestParam Long companyId){
        priceService.deletePrintPrice(id, companyId);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("delete print price successfully")
            .build()
        );
    }
    

}
