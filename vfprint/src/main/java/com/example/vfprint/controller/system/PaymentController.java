package com.example.vfprint.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.request.PaymentRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/system/payment")
public class PaymentController {
    
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<ApiResponse> createPayment(@RequestBody PaymentRequest request){
        paymentService.createPayment(request);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .build()
        );
    }
}
