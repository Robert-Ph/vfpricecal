package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.request.ProfitItemRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.ProfitItemService;

@RestController
@RequestMapping("/api/profit/item")
public class ProfitItemController {
    
    @Autowired
    private ProfitItemService profitItemService;

    @PutMapping
    public ResponseEntity<ApiResponse> updateItem(@RequestBody ProfitItemRequest request){
        profitItemService.updateProfitItem(request);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(request)
            .build()
        );
    }
}
