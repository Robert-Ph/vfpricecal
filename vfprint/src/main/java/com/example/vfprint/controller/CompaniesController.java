package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.example.vfprint.dto.CompaniesDto;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.service.CompaniesService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @GetMapping("/search")
    public List<CompaniesDto> searchCompanies(@RequestParam("param") String param) {
        return companiesService.searchCompanies(param);
    }

    @GetMapping("{id}")
    public CompaniesDto getCompanyById(@PathVariable Long id) {
        return companiesService.getCompanyById(id);
    }
    

    @PostMapping
    public ResponseEntity<String> createCompany(@RequestBody CompaniesDto company) {
        companiesService.createCompany(company);
        return ResponseEntity.ok("Company created successfully");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable Long id) {
        companiesService.deleteCompany(id);
        return ResponseEntity.ok("Company deleted");
    }
    



}
