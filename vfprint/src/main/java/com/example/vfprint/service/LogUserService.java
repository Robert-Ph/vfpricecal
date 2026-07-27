package com.example.vfprint.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.dto.response.LogUserResponse;
import com.example.vfprint.entity.Account;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.LogUser;
import com.example.vfprint.enums.ActionLog;
import com.example.vfprint.enums.LevelLog;
import com.example.vfprint.enums.StatusLog;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.repository.LogUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogUserService {
    private final LogUserRepository logUserRepository;
    private final CompaniesRepository companiesRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public void createLogUser(UUID companyId,LevelLog levelLog, ActionLog actionLog, UUID accountID, String content, StatusLog statusLog){
        Companies companies = companiesRepository.findById(companyId).orElseThrow();
        Account account = accountRepository.findById(accountID).orElseThrow();
        LogUser result = LogUser.builder()
                            .company(companies)
                            .level(levelLog)
                            .action(actionLog)
                            .account(account)
                            .content(content)
                            .status(statusLog)
                            .createAt(Timestamp.valueOf(LocalDateTime.now()))
                            .build();
        
        logUserRepository.save(result);
    }


    @Transactional
    public List<LogUserResponse> getAllLogByCompany(UUID id){

        Companies companies = companiesRepository.findById(id).orElseThrow();

        List<LogUser> listLog = logUserRepository.findByCompany(companies);

        return listLog.stream()
                .map(item -> LogUserResponse.builder()
                            .id(item.getId())
                            .level(item.getLevel().name())
                            .action(item.getAction().name())
                            .accountName(item.getAccount().getUsername())
                            .content(item.getContent())
                            .createAt(item.getCreateAt())
                            .status(item.getStatus().name())
                            .build()
                            ).collect(Collectors.toList());
    }
}
