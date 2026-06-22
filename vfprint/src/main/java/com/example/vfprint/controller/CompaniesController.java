package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

import com.example.vfprint.dto.CompaniesDto;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.CompaniesService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/companies")
public class CompaniesController {
    
    @Autowired 
    private CompaniesService companiesService;



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
    

    // @PostMapping
    // public ResponseEntity<ApiResponse> createCompany(@RequestBody CompaniesDto company) {
    //     companiesService.createCompany(company);

    //     return ResponseEntity.status(HttpStatus.CREATED).body(
    //         ApiResponse.builder()
    //             .code(HttpStatus.CREATED.value())
    //             .message("Company created successfully")
    //             .build()
    //     );
    // }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse> deleteCompany(@PathVariable UUID id) {
        companiesService.deleteCompany(id);
        return ResponseEntity.ok(
            ApiResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Company deleted successfully")
                .build()
        );
    }
    



}
