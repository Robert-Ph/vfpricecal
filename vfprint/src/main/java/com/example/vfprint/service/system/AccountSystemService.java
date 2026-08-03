package com.example.vfprint.service.system;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.entity.system.AccountSystem;
import com.example.vfprint.config.EmailService;
import com.example.vfprint.config.UltiService;
import com.example.vfprint.dto.system.AccountSystemRequest;
import com.example.vfprint.repository.systemRepository.AccountSystemRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountSystemService {
    private final AccountSystemRepository accountSystemRepository;
    private final UltiService ultiService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createAccountSystem(AccountSystemRequest accountSystem) {
        if(accountSystemRepository.existsByEmail(accountSystem.getEmail())) {
            throw new IllegalArgumentException("Account with email " + accountSystem.getEmail() + " already exists.");
        }
        String newPassword = ultiService.generateRandomPassword();
        AccountSystem accountSystemEntity = AccountSystem.builder()
                .name(accountSystem.getName())
                .email(accountSystem.getEmail())
                .password(passwordEncoder.encode(newPassword))
                .role(accountSystem.getRole())
                .build();
        accountSystemRepository.save(accountSystemEntity);
        emailService.sendPasswordNewAccount(accountSystemEntity.getEmail().toLowerCase(), newPassword);
    }
}
