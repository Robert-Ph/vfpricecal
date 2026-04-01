package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.entity.Account;
import com.example.vfprint.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Account createAccount(Account account){
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }


}
