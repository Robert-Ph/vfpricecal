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
    public void createCompany(CompaniesDto company){

        if(companiesRepository.existsByName(company.getName())){
            throw new RuntimeException("Company with the same name already exists");
        }

        Companies entity = Companies.builder()
                .name(company.getName())
                .phone(company.getPhone())
                .address(company.getAddress())
                .taxCode(company.getTaxCode())
                .email(company.getEmail())
                .type(company.getType())
                .build();

        companiesRepository.save(entity);
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
    public CompaniesDto getCompanyById(Long id){
        Companies company = companiesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        CompaniesDto dto = new CompaniesDto();
        dto.setName(company.getName());
        dto.setPhone(company.getPhone());
        dto.setAddress(company.getAddress());
        dto.setTaxCode(company.getTaxCode());
        dto.setEmail(company.getEmail());
        dto.setType(company.getType());
        return dto;
    }

    //get all companies
    @Transactional(readOnly = true)
    public List<CompaniesDto> getAllCompanies(){
        return companiesRepository.findAll()
                .stream()
                .map(company -> {
                    CompaniesDto dto = new CompaniesDto();
                    dto.setName(company.getName());
                    dto.setPhone(company.getPhone());
                    dto.setAddress(company.getAddress());
                    return dto;
                })
                .toList();
    }

    @Transactional
    public List<CompaniesDto> searchCompanies(String param){
        return companiesRepository.search(param)
                .stream()
                .map(company -> {
                    CompaniesDto dto = new CompaniesDto();
                    dto.setName(company.getName());
                    dto.setPhone(company.getPhone());
                    dto.setAddress(company.getAddress());
                    return dto;
                })
                .toList();
    }

}
