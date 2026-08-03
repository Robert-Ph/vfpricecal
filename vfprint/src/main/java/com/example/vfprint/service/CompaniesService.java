package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import com.example.vfprint.entity.Category;
import com.example.vfprint.repository.CompanyStatusRepository;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.dto.request.CompanyRequest;
import com.example.vfprint.dto.request.DiscountRangeRequest;
import com.example.vfprint.dto.request.DiscountRequest;
import com.example.vfprint.dto.request.ProcessingRequest;
import com.example.vfprint.dto.request.ProcessingTierRequest;
import com.example.vfprint.dto.system.CompaniesReponse;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.CompaniesStatus;
import com.example.vfprint.repository.RolesRepository;
import com.example.vfprint.dto.AccountDTO;
import com.example.vfprint.dto.CategoryDTO;
import com.example.vfprint.entity.Roles;
import com.example.vfprint.config.UltiService;
import com.example.vfprint.config.EmailService;
import com.example.vfprint.repository.UserStatusRepository;
import com.example.vfprint.repository.systemRepository.CompansySubscriptionsRepository;
import com.example.vfprint.entity.UserStatus;
import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.enums.Priority;
import java.math.BigDecimal;
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
    private final UserStatusRepository userStatusRepository;
    private final CompansySubscriptionsRepository compansySubscriptionsRepository;
    private final CategoryService categoryService;
    private final ProfitService profitService;
    private final ProcessingService processingService;
    private final DiscountService discountService;



    // Create a new company
    @Transactional
    public Companies createCompany(CompanyRequest company){

        if(companiesRepository.existsByName(company.getName()) || companiesRepository.existsByEmailAndPhone(company.getEmail(), company.getPhone()) ){
            throw new RuntimeException("Company with the same name already exists");
        }


        CompaniesStatus status = companyStatusRepository.findById(company.getStatusId())
                .orElseThrow(() -> new RuntimeException("Company status not found"));
        
        String name = company.getName();
        if(company.getCustomType().equals("PERSONAL")){
                name = company.getUserName();
        }

        Companies entity = Companies.builder()
                .name(name)
                .phone(company.getPhone())
                .address(company.getAddress())
                .taxCode(company.getTaxCode())
                .email(company.getEmail())
                .code(company.getCode())
                .logoUrl(company.getLogoUrl())
                .customType(company.getCustomType())
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
        Category category1 = categoryService.createCategory(cate1, false);
        Category category2 = categoryService.createCategory(cate2, false);
        categoryService.createCategory(cate3, false);


                                             

        // Tạo danh sách các tier mẫu
List<ProcessingTierRequest> tierRequestList = Arrays.asList(
    ProcessingTierRequest.builder()
            .isActive(true)
            .minVolume(1)
            .maxVolume(100)
            .minCharge(50000)
            .price(2000)
            .build(),

    ProcessingTierRequest.builder()
            .isActive(true)
            .minVolume(101)
            .maxVolume(500)
            .minCharge(100000)
            .price(1800)
            .build(),

    ProcessingTierRequest.builder()
            .isActive(true)
            .minVolume(501)
            .maxVolume(1000)
            .minCharge(200000)
            .price(1500)
            .build()
);

        ProcessingRequest processingRequest = ProcessingRequest.builder()
                                                .categoryId(category1.getId())
                                                .name("Cán bóng")
                                                .unit("sheet")
                                                .pTierRequests(tierRequestList)
                                                .build();
        ProcessingRequest processingRequest_1 = ProcessingRequest.builder()
                                                .categoryId(category1.getId())
                                                .name("Cán mờ")
                                                .unit("sheet")
                                                .pTierRequests(tierRequestList)
                                                .build();

        processingService.createProcessing(processingRequest);
        processingService.createProcessing(processingRequest_1);

        List<ProcessingTierRequest> tierRequestList_cutter = Arrays.asList(
    ProcessingTierRequest.builder()
            .isActive(true)
            .minVolume(1)
            .maxVolume(100)
            .minCharge(50000)
            .price(2000)
            .build(),

    ProcessingTierRequest.builder()
            .isActive(true)
            .minVolume(101)
            .maxVolume(500)
            .minCharge(100000)
            .price(1800)
            .build(),

    ProcessingTierRequest.builder()
            .isActive(true)
            .minVolume(501)
            .maxVolume(1000)
            .minCharge(200000)
            .price(1500)
            .build()
);

        ProcessingRequest processingRequest_3 = ProcessingRequest.builder()
                                                .categoryId(category2.getId())
                                                .name("Bế demi")
                                                .unit("sheet")
                                                .pTierRequests(tierRequestList_cutter)
                                                .build();

        processingService.createProcessing(processingRequest_3);
                                        
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

        profitService.createProfit(profitRequest, false);
        

        List<DiscountRangeRequest> listRang = Arrays.asList(
                DiscountRangeRequest.builder()
                        .maxAmount(BigDecimal.valueOf(1000000))
                        .discount(0)
                        .build(),
                DiscountRangeRequest.builder()
                        .maxAmount(BigDecimal.valueOf(10000000))
                        .discount(5)
                        .build(),
                DiscountRangeRequest.builder()
                        .maxAmount(BigDecimal.valueOf(1000000000))
                        .discount(15)
                        .build()
                        
        );

        DiscountRequest discountRequest = DiscountRequest.builder()
                                                .companyId(companies.getId())
                                                .discountRanges(listRang)
                                                .isActive(true)
                                                .name("Chiếc khấu mặc định")
                                                .priority(Priority.HIGH)
                                                .build();
        discountService.createDiscountByCompany(discountRequest);

        Roles role = roleRepository.findByName("OWNER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

                // Generate a new random password (you can use a more secure method in production)
        String newPassword = ultiService.generateRandomPassword();

        AccountDTO accountDto = new AccountDTO();
        accountDto.setEmail(company.getEmail());
        accountDto.setUsername(company.getUserName());
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
