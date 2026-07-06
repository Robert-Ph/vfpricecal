package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.entity.Category;
import com.example.vfprint.repository.CompanyStatusRepository;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.dto.request.CompanyRequest;
import com.example.vfprint.dto.system.CompaniesReponse;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.CompaniesStatus;
import com.example.vfprint.repository.RolesRepository;
import com.example.vfprint.dto.AccountDTO;
import com.example.vfprint.dto.CategoryDTO;
import com.example.vfprint.entity.Roles;
import com.example.vfprint.config.UltiService;
import com.example.vfprint.config.EmailService;
import com.example.vfprint.repository.UserStatusREpository;
import com.example.vfprint.repository.systemRepository.CompansySubscriptionsRepository;
import com.example.vfprint.entity.UserStatus;
import com.example.vfprint.entity.system.CompansySubscriptions;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.dto.request.ProfitRequest;
import com.example.vfprint.dto.request.ProfitItemRequest;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class CompaniesService {

    private final CompaniesRepository companiesRepository;
    private final CompanyStatusRepository companyStatusRepository;
    private final RolesRepository roleRepository;
    private final UltiService ultiService;
    private final AccountService accountService;
    private final EmailService emailService;
    private final UserStatusREpository userStatusRepository;
    private final CompansySubscriptionsRepository compansySubscriptionsRepository;
    private final CategoryService categoryService;
    private final ProfitService profitService;



    // Create a new company
    @Transactional
    public Companies createCompany(CompanyRequest company){

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

        Companies companies = companiesRepository.save(entity);

        CategoryDTO cate1 = CategoryDTO.builder()
                                .companyId(companies.getId())
                                .name("Cán màng")
                                .build();
        CategoryDTO cate2 = CategoryDTO.builder()
                                .companyId(companies.getId())
                                .name("Bế tem")
                                .build();
        CategoryDTO cate3 = CategoryDTO.builder()
                                .companyId(companies.getId())
                                .name("Gia công khác")
                                .build();
        Category category1 = categoryService.createCategory(cate1, true);
        Category category2 = categoryService.createCategory(cate2, true);
        Category category3 = categoryService.createCategory(cate3, true);

        List<ProfitItemRequest> itemList = Arrays.asList(
                ProfitItemRequest.builder()
                        .name("Giấy in")
                        .percent(30.0)
                        .build(),

                ProfitItemRequest.builder()
                        .name("In ấn")
                        .percent(30.0)
                        .build(),

                ProfitItemRequest.builder()
                        .name("Gia công")
                        .percent(30.0)
                        .build()
        );
        ProfitRequest profitRequest = ProfitRequest.builder()
                .companyId(companies.getId())
                .name("Lợi nhuận mặc định")
                .priority(com.example.vfprint.enums.Priority.HIGH)
                .itemList(itemList)
                .build();

        profitService.createProfit(profitRequest);
        

        Roles role = roleRepository.findByName("OWNER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

                // Generate a new random password (you can use a more secure method in production)
        String newPassword = ultiService.generateRandomPassword();

        AccountDTO accountDto = new AccountDTO();
        accountDto.setEmail(company.getEmail());
        accountDto.setUsername(company.getName());
        accountDto.setPassword(newPassword); // Sử dụng mật khẩu ngẫu nhiên đã tạo
        accountDto.setCompanyId(entity.getId());
        accountDto.setRoleId(role.getId()); // ID của role "Owner"
        
        UserStatus activeStatus = userStatusRepository.findByCode("ACTIVE")
                .orElseThrow(() -> new RuntimeException("User status not found"));
        accountDto.setStatusId(activeStatus.getId());

        accountService.createAccount(accountDto);
        emailService.sendPasswordNewAccount(company.getEmail(), newPassword);

        return entity;
    }

    // Update company details
    @Transactional
    public Companies updateCompany(CompanyRequest company){
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
    public CompaniesReponse getCompanyById(UUID id){
        Companies company = companiesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        CompaniesReponse dto = new CompaniesReponse();
        CompansySubscriptions sub = getSubscriptionsByActive(company);
        dto.setId(id);
        dto.setCode(company.getCode());
        dto.setName(company.getName());
        dto.setPhone(company.getPhone());
        dto.setAddress(company.getAddress());
        dto.setTaxCode(company.getTaxCode());
        dto.setEmail(company.getEmail());
        dto.setStatusId(company.getStatus().getCode());
        dto.setLogoUrl(company.getLogoUrl());
        dto.setCreateAt(company.getCreateAt());
        dto.setUpdateAt(company.getUpdateAt());
        dto.setStartTime(sub.getStartDate());
        dto.setPlan(sub.getPlan().getCode());
        dto.setEndTime(sub.getEndDate());
        dto.setPriceMonth(sub.getPlan().getPrice());
        return dto;
    }

    @Transactional(readOnly = true)
public List<CompaniesReponse> getAllCompanies() {
    
    return companiesRepository.findAll()
            .stream()
            .map(company -> 
                CompaniesReponse.builder()
                    .id(company.getId())
                    .address(company.getAddress())
                    .code(company.getCode())
                    .name(company.getName())
                    .phone(company.getPhone())
                    .statusId(company.getStatus().getCode())
                    .createAt(company.getCreateAt())
                    .plan(getSubscriptionsByActive(company).getPlan().getCode())
                    
                    // SỬA Ở ĐÂY: Gọi trực tiếp .map() vì findByCompany đã là một Optional rồi
                    .endTime(getSubscriptionsByActive(company).getEndDate()) // Nếu không có gói đăng ký, tự động trả về null
                    
                    .build()
            )
            .toList();
}

public CompansySubscriptions getSubscriptionsByActive(Companies company){
        CompansySubscriptions result = new CompansySubscriptions();
        List<CompansySubscriptions> subscriptions = compansySubscriptionsRepository.findByCompany(company);
        for(CompansySubscriptions sub: subscriptions){
                if (sub.getSubscriptionStatus().getCode().equals("ACTIVE")) {
                        result = sub;
                }
        }
        return result;
}

}
