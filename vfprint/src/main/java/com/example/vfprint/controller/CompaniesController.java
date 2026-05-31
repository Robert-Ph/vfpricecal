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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/companies")
public class CompaniesController {
    
    @Autowired 
    private CompaniesService companiesService;



    @GetMapping
    public List<CompaniesDto> getAllCompanies() {
        return companiesService.getAllCompanies();
    }
    
    // @GetMapping("/search")
    // public List<CompaniesDto> searchCompanies(@RequestParam("param") String param) {
    //     return companiesService.searchCompanies(param);
    // }

    @GetMapping("{id}")
    public CompaniesDto getCompanyById(@PathVariable UUID id) {
        return companiesService.getCompanyById(id);
    }
    

    @PostMapping
    public ResponseEntity<ApiResponse> createCompany(@RequestBody CompaniesDto company) {
        companiesService.createCompany(company);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.builder()
                .code(HttpStatus.CREATED.value())
                .message("Company created successfully")
                .build()
        );
    }

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
