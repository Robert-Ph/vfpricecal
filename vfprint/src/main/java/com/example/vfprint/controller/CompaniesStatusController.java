package com.example.vfprint.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.vfprint.service.CompaniesStatusService;
import com.example.vfprint.entity.CompaniesStatus;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/system/companies-status")
public class CompaniesStatusController {
    
    @Autowired
    private CompaniesStatusService companiesStatusService;


    @GetMapping
    public List<CompaniesStatus> getAllCompaniesStatus() {
        return companiesStatusService.getAllCompaniesStatus();
    }
}
