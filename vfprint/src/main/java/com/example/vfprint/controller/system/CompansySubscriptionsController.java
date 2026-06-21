package com.example.vfprint.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.CompansySubscriptionsService;

@RestController
@RequestMapping("/api/system/orders")
public class CompansySubscriptionsController {
    @Autowired
    private CompansySubscriptionsService compansySubscriptionsService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllOrder(){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(200)
                .data(compansySubscriptionsService.getOrders())
                .build()
        );
    }
}
