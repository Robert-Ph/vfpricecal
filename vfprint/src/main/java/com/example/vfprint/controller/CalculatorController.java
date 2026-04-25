package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.service.CalculatorService;
import com.example.vfprint.dto.InfoPriceDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {
    
    @Autowired
    private CalculatorService calculatorService;


    @GetMapping
    public double getMethodName(@RequestBody InfoPriceDTO infoPriceDTO) {
        return calculatorService.calculatePrintingCost(infoPriceDTO);
    }
    

}
