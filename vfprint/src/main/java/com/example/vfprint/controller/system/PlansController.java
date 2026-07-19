package com.example.vfprint.controller.system;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.PlansService;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.dto.system.PlansRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/system/plans")
public class PlansController {
    
    private final PlansService plansService;



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


    @PostMapping
    public ResponseEntity<ApiResponse> createPlan(@RequestBody PlansRequest plansRequest){
        plansService.createPlan(plansRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Create plan successfully")
            .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePlan(@PathVariable UUID id, @RequestBody PlansRequest plansRequest){
        plansService.updatePlan(id, plansRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Update plan successfully")
            .build()
        );
    }
    
}
