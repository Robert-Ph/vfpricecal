package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.service.AccountService;
import com.example.vfprint.entity.Account;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    
    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;


    @GetMapping("username/{username}")
    public Account getAccountByUsername(@PathVariable String username){
        return accountService.getAccountByUsername(username);
    }

    @GetMapping
    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    @GetMapping("id/{id}")
    public Account getAccountById(@PathVariable Long id){
        return accountService.getAccountById(id);
    }

    @PostMapping()
    public Account createAccount(@RequestBody Account account){
        return accountService.createAccount(account);
    }

    @DeleteMapping("id/{id}")
    public String deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return "Account deleted";
    }
}
