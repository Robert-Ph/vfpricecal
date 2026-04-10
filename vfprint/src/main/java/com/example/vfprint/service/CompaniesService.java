package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.dto.CompaniesDto;
import com.example.vfprint.entity.Companies;

@Service
public class CompaniesService {
    
    @Autowired  
    private CompaniesRepository companiesRepository;


    // Create a new company
    @Transactional
    public Companies createCompany(Companies company){
        return companiesRepository.save(company);
    }

    // Update company details
    @Transactional
    public Companies updateCompany(Companies company){
        Companies existingCompany = companiesRepository.findById(company.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));  
        existingCompany.setName(company.getName());
        return companiesRepository.save(existingCompany);
    }
    
    // Delete a company by ID
    @Transactional
    public void deleteCompany(Long id){
        companiesRepository.deleteById(id);
    }


    //get company by ID
    @Transactional(readOnly = true)
    public Companies getCompanyById(Long id){
        return companiesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    //get all companies
    @Transactional(readOnly = true)
    public List<Companies> getAllCompanies(){
        return companiesRepository.findAll();
    }

    @Transactional
    public List<Companies> searchCompanies(String param){
        return companiesRepository.search(param);
    }

}
