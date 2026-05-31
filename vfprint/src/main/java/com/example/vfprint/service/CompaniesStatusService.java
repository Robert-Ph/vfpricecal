package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.repository.CompaniesStatusRepository;
import com.example.vfprint.entity.CompaniesStatus;
import java.util.List;

@Service
public class CompaniesStatusService {
    
    @Autowired
    private CompaniesStatusRepository companiesStatusRepository;

    @Transactional
    public List<CompaniesStatus> getAllCompaniesStatus() {
        return companiesStatusRepository.findAll();
    }
}
