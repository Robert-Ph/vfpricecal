package com.example.vfprint.controller.system;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.PlansService;

import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPlanById(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(plansService.getPlanById(id))
            .build()
        );
    }
    
}
