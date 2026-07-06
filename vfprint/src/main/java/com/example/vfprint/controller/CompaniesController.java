package com.example.vfprint.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.UUID;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.vfprint.dto.request.CompanyRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.CompaniesService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/companies")
public class CompaniesController {
    
    private final CompaniesService companiesService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCompanies() {
        // return companiesService.getAllCompanies();
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(companiesService.getAllCompanies())
            .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCompanyById(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(companiesService.getCompanyById(id))
            .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCompany(@PathVariable UUID id, @RequestBody CompanyRequest company) {
        company.setId(id);
        companiesService.updateCompany(company);
        return ResponseEntity.ok(
            ApiResponse.builder()
                .code(200)
                .message("Company updated successfully")
                .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCompany(@PathVariable UUID id) {
        companiesService.deleteCompany(id);
        return ResponseEntity.ok(
            ApiResponse.builder()
                .code(200)
                .message("Company deleted successfully")
                .build()
        );
    }
    



}
