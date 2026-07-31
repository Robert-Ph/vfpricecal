package com.example.vfprint.service.system.temp;

import java.time.LocalDateTime;
import java.util.UUID;
import java.sql.Timestamp;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.config.Code;
import com.example.vfprint.dto.request.CompanyRegistrationsRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.entity.system.CompanyRegistrations;
import com.example.vfprint.enums.Status;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.repository.systemRepository.CompanyRegistrationsRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyRegistrationsService {
    
    private final CompanyRegistrationsRepository companyRegistrationsRepository;
    private final CompaniesRepository companiesRepository;



    @Transactional
    public ApiResponse createCompanyRegistrations(CompanyRegistrationsRequest request){

        if (companiesRepository.existsByEmailAndPhone(request.getEmail(), request.getPhone())) {
            return ApiResponse.builder()
                                        .code(Code.CONFLICT)
                                        .message("Email hoặc số điện thoại đã được đăng ký")
                                        .build();
        }

        CompanyRegistrations result = CompanyRegistrations.builder()
                                        .fullName(request.getFullName())
                                        .userName(request.getUserName())
                                        .customType(request.getCustomType())
                                        .userName(request.getUserName())
                                        .name(request.getName())
                                        .email(request.getEmail())
                                        .phone(request.getPhone())
                                        .address(request.getAddress())
                                        .taxCode(request.getTaxCode())
                                        .createAt(Timestamp.valueOf(LocalDateTime.now()))
                                        .status(Status.PENDING)
                                        .customType(request.getCustomType())
                                        .build();
        companyRegistrationsRepository.save(result);
        return ApiResponse.builder()
                .code(Code.SUCCESS)
                .message("Thành công")
                .data(result)
                .build();
    }

    @Transactional
    public CompanyRegistrations getCompanyRegistrationsById(UUID id){
        return companyRegistrationsRepository.findById(id).orElseThrow();
    }
}
