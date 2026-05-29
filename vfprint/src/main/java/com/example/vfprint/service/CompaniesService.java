package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.repository.CompanyStatusRepository;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.dto.CompaniesDto;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.CompaniesStatus;

@Service
public class CompaniesService {
    
    @Autowired  
    private CompaniesRepository companiesRepository;

    @Autowired
    private CompanyStatusRepository companyStatusRepository;


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
                .code(company.getCode())
                .logoUrl(company.getLogoUrl())
                .status(CompaniesStatus.builder().id(company.getStatusId()).build())
                .createAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .updateAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .build();

        companiesRepository.save(entity);
    }

    // Update company details
    @Transactional
    public Companies updateCompany(Companies company){
        Companies existingCompany = companiesRepository.findById(company.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));  
        existingCompany.setName(company.getName());
        existingCompany.setPhone(company.getPhone());
        existingCompany.setAddress(company.getAddress());
        existingCompany.setTaxCode(company.getTaxCode());
        existingCompany.setEmail(company.getEmail());
        existingCompany.setCode(company.getCode());
        existingCompany.setLogoUrl(company.getLogoUrl());
        existingCompany.setUpdateAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return companiesRepository.save(existingCompany);
    }
    
    // Delete a company by ID
    @Transactional
    public void deleteCompany(UUID id){
        companiesRepository.deleteById(id);
    }


    //get company by ID
    @Transactional(readOnly = true)
    public CompaniesDto getCompanyById(UUID id){
        Companies company = companiesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        CompaniesDto dto = new CompaniesDto();
        dto.setCode(company.getCode());
        dto.setName(company.getName());
        dto.setPhone(company.getPhone());
        dto.setAddress(company.getAddress());
        dto.setTaxCode(company.getTaxCode());
        dto.setEmail(company.getEmail());
        dto.setStatusId(company.getStatus().getId());
        dto.setLogoUrl(company.getLogoUrl());
        dto.setCreateAt(company.getCreateAt());
        dto.setUpdateAt(company.getUpdateAt());
        return dto;
    }

    //get all companies
    @Transactional(readOnly = true)
    public List<CompaniesDto> getAllCompanies(){
        return companiesRepository.findAll()
                .stream()
                .map(company -> {
                    CompaniesDto dto = new CompaniesDto();
                    dto.setCode(company.getCode());
                    dto.setName(company.getName());
                    dto.setPhone(company.getPhone());
                    dto.setAddress(company.getAddress());
                    return dto;
                })
                .toList();
    }

    // @Transactional
    // public List<CompaniesDto> searchCompanies(String param){
    //     return companiesRepository.search(param)
    //             .stream()
    //             .map(company -> {
    //                 CompaniesDto dto = new CompaniesDto();
    //                 dto.setName(company.getName());
    //                 dto.setPhone(company.getPhone());
    //                 dto.setAddress(company.getAddress());
    //                 return dto;
    //             })
    //             .toList();
    // }

}
