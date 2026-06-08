package com.example.vfprint.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.PlansService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/system/plans")
public class PlansController {
    
    @Autowired
    private PlansService plansService;


    @GetMapping
    public ResponseEntity<ApiResponse> getAllPlans(){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Get all plans successfully")
            .data(plansService.getAllPlansRequest())
            .build()
        );
    }
    
}
