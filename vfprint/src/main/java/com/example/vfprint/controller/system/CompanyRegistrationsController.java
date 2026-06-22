package com.example.vfprint.controller.system;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.request.CompanyRegistrationsRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.temp.CompanyRegistrationsService;

@RestController
@RequestMapping("/api/system/register/temp")
public class CompanyRegistrationsController {

    @Autowired
    private CompanyRegistrationsService companyRegistrationsService;


    @PostMapping
    public ResponseEntity<ApiResponse> createTemp(@RequestBody CompanyRegistrationsRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(companyRegistrationsService.createCompanyRegistrations(request))
            .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getComResponseEntityById(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(companyRegistrationsService.getCompanyRegistrationsById(id))
            .build()
        );
    }
    
}
