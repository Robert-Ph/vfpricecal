package com.example.vfprint.service.system.temp;

import java.time.LocalDateTime;
import java.util.UUID;
import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.dto.request.CompanyRegistrationsRequest;
import com.example.vfprint.entity.system.CompanyRegistrations;
import com.example.vfprint.enums.Status;
import com.example.vfprint.repository.systemRepository.CompanyRegistrationsRepository;

@Service
public class CompanyRegistrationsService {
    @Autowired
    private CompanyRegistrationsRepository companyRegistrationsRepository;



    @Transactional
    public CompanyRegistrations createCompanyRegistrations(CompanyRegistrationsRequest request){
        CompanyRegistrations result = CompanyRegistrations.builder()
                                        .fullName(request.getFullName())
                                        .name(request.getName())
                                        .email(request.getEmail())
                                        .phone(request.getPhone())
                                        .address(request.getAddress())
                                        .taxCode(request.getTaxCode())
                                        .createAt(Timestamp.valueOf(LocalDateTime.now()))
                                        .status(Status.PENDING)
                                        .build();
        return companyRegistrationsRepository.save(result);
    }

    @Transactional
    public CompanyRegistrations getCompanyRegistrationsById(UUID id){
        return companyRegistrationsRepository.findById(id).orElseThrow();
    }
}
