package com.example.vfprint.service;

import java.util.List;

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


    // Create a new account with encoded password
    @Transactional
    public Account createAccount(Account account){
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }


    // Update account details, including password if provided
    @Transactional
    public Account updateAccount(Account account){
        Account existingAccount = accountRepository.findById(account.getId())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        
        existingAccount.setUsername(account.getUsername());
        if (account.getPassword() != null && !account.getPassword().isEmpty()) {
            existingAccount.setPassword(passwordEncoder.encode(account.getPassword()));
        }
        
        return accountRepository.save(existingAccount);
    }

    // Delete an account by ID
    @Transactional
    public void deleteAccount(Long id){
        accountRepository.deleteById(id);
    }

    // Retrieve an account by ID
    @Transactional(readOnly = true)
    public Account getAccountById(Long id){
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    @Transactional
    public List<Account> searchAccounts(String param){
        return accountRepository.search(param);
    }

    // Retrieve an account by username
    @Transactional(readOnly = true)
    public Account getAccountByUsername(String username){
        return accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }


    // Check if a username already exists
    @Transactional(readOnly = true)
    public boolean checkUsernameExists(String username){
        return accountRepository.findByUsername(username).isPresent();
    }


    // Validate raw password against encoded password
    @Transactional
    public boolean checkPassword(String rawPassword, String encodedPassword){
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }




}
