package com.example.vfprint.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.PaymentMethodService;

@RestController
@RequestMapping("/api/system/payment-method")
public class PaymentMethodController {
    
    @Autowired
    private PaymentMethodService paymentMethodService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllPaymentMethod(){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(paymentMethodService.getAllPaymentMethod())
            .build()
        );
    }
}
