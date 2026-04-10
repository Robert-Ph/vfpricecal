package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.service.CompaniesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/companies")
public class CompaniesController {
    
    @Autowired 
    private CompaniesService companiesService;

    @Autowired
    private CompaniesRepository companiesRepository;


    @GetMapping
    public List<Companies> getAllCompanies() {
        return companiesService.getAllCompanies();
    }
    
    @GetMapping("/search")
    public List<Companies> searchCompanies(@RequestParam("param") String param) {
        return companiesService.searchCompanies(param);
    }

    @PostMapping
    public Companies createCompany(@RequestBody Companies company) {
        return companiesService.createCompany(company);
    }
    



}
