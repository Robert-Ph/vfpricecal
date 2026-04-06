package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.service.AccountService;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    
    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;


    @GetMapping("/{username}")
    public String getAccountByUsername(String username){
        return accountService.getAccountByUsername(username).toString();
    }

    @GetMapping
    public String getAllAccounts(){
        return accountRepository.findAll().toString();
    }

    @GetMapping("/{id}")
    public String getAccountById(Long id){
        return accountService.getAccountById(id).toString();
    }

    @PostMapping()
    public String createAccount(){
        // Implementation for creating an account
        return "Account created";
    }

    @DeleteMapping("/{id}")
    public String deleteAccount(Long id){
        accountService.deleteAccount(id);
        return "Account deleted";
    }
}
