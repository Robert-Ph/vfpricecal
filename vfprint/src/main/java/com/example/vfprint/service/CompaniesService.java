package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.repository.CompanyStatusRepository;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.dto.CompaniesDto;
import com.example.vfprint.dto.system.CompaniesRequest;
import com.example.vfprint.dto.system.CompansySubscriptionsDTO;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.CompaniesStatus;
import com.example.vfprint.repository.RolesRepository;
import com.example.vfprint.dto.AccountDTO;
import com.example.vfprint.entity.Roles;
import com.example.vfprint.config.UltiService;
import com.example.vfprint.config.EmailService;
import com.example.vfprint.repository.UserStatusREpository;
import com.example.vfprint.repository.systemRepository.CompansySubscriptionsRepository;
import com.example.vfprint.service.system.CompansySubscriptionsService;
import com.example.vfprint.entity.UserStatus;


@Service
public class CompaniesService {
    
    @Autowired  
    private CompaniesRepository companiesRepository;

    @Autowired
    private CompanyStatusRepository companyStatusRepository;

    @Autowired
    private RolesRepository roleRepository;

    @Autowired
    private UltiService ultiService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserStatusREpository userStatusRepository;

    @Autowired
    private CompansySubscriptionsService compansySubscriptionsService;

    @Autowired
    private CompansySubscriptionsRepository compansySubscriptionsRepository;


    // Create a new company
    @Transactional
    public void createCompany(CompaniesDto company){

        if(companiesRepository.existsByName(company.getName())){
            throw new RuntimeException("Company with the same name already exists");
        }

        CompaniesStatus status = companyStatusRepository.findById(company.getStatusId())
                .orElseThrow(() -> new RuntimeException("Company status not found"));
        Companies entity = Companies.builder()
                .name(company.getName())
                .phone(company.getPhone())
                .address(company.getAddress())
                .taxCode(company.getTaxCode())
                .email(company.getEmail())
                .code(company.getCode())
                .logoUrl(company.getLogoUrl())
                .status(status)
                .createAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .updateAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .build();

        companiesRepository.save(entity);


        CompansySubscriptionsDTO compansySubscriptionsDTO = CompansySubscriptionsDTO.builder()
                                                            .companyId(entity.getId())
                                                            .planId(company.getPlan())
                                                            .time(company.getDuration())
                                                            .build();

        compansySubscriptionsService.createCompansySubscriptions(compansySubscriptionsDTO);


        Roles role = roleRepository.findByName("OWNER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

                // Generate a new random password (you can use a more secure method in production)
        String newPassword = ultiService.generateRandomPassword();

        AccountDTO accountDto = new AccountDTO();
        accountDto.setEmail(company.getEmail());
        accountDto.setUsername(company.getName());
        accountDto.setPassword(passwordEncoder.encode(newPassword)); // Sử dụng mật khẩu ngẫu nhiên đã tạo
        accountDto.setCompanyId(entity.getId());
        accountDto.setRoleId(role.getId()); // ID của role "Owner"
        
        UserStatus activeStatus = userStatusRepository.findByCode("ACTIVE")
                .orElseThrow(() -> new RuntimeException("User status not found"));
        accountDto.setStatusId(activeStatus.getId());

        accountService.createAccount(accountDto);
        emailService.sendPasswordNewAccount(company.getEmail(), newPassword);
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

    @Transactional(readOnly = true)
public List<CompaniesRequest> getAllCompanies() {
    
    return companiesRepository.findAll()
            .stream()
            .map(company -> 
                CompaniesRequest.builder()
                    .id(company.getId())
                    .address(company.getAddress())
                    .code(company.getCode())
                    .name(company.getName())
                    .phone(company.getPhone())
                    .statusId(company.getStatus().getCode())
                    .createAt(company.getCreateAt())
                    .plan(compansySubscriptionsRepository.findByCompany(company)
                            .map(subscription -> subscription.getPlan().getCode())
                            .orElse(null))
                    
                    // SỬA Ở ĐÂY: Gọi trực tiếp .map() vì findByCompany đã là một Optional rồi
                    .endTime(compansySubscriptionsRepository.findByCompany(company)
                            .map(subscription -> subscription.getEndDate())
                            .orElse(null)) // Nếu không có gói đăng ký, tự động trả về null
                    
                    .build()
            )
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
