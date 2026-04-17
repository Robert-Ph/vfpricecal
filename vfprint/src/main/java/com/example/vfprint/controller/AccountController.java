package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.service.AccountService;
import org.springframework.http.ResponseEntity;
import com.example.vfprint.dto.AccountDTO;
import com.example.vfprint.entity.Account;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    
    @Autowired
    private AccountService accountService;

    @GetMapping
    public List<AccountDTO> getAllAccounts(){
        return accountService.getAllAccounts();
    }

    @GetMapping("{id}")
    public AccountDTO getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id);
    }
    
    @GetMapping("/company/{id}")
    public List<AccountDTO> getAccountsByCompanyId(@PathVariable Long id) {
        return accountService.getAllByCompanyId(id);
    }
    

    @GetMapping("/search")
    public List<AccountDTO> searchAccounts(@RequestParam("param") String param){
        return accountService.searchAccounts(param);
    }

    @PostMapping()
    public ResponseEntity<String> createAccount(@RequestBody AccountDTO account){
        accountService.createAccount(account);
        return ResponseEntity.ok("Account created successfully");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return ResponseEntity.ok("Account deleted");
    }
}
