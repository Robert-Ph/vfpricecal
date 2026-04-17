package com.example.vfprint.service;

import java.util.List;
import java.util.stream.Collectors;

import com.example.vfprint.entity.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.dto.AccountDTO;
import com.example.vfprint.entity.Account;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.repository.RolesRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AccountService {
    
  
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CompaniesRepository companyRepository;

    @Autowired
    private RolesRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    // Create a new account with encoded password
    @Transactional
    public void createAccount(AccountDTO accountDto){
        //1. kiem tra username da ton tai chua
        if (accountRepository.existsByUsername(accountDto.getUsername())) {
            throw new RuntimeException("Username already exists");
            
        }

        //2. tim company theo companyId
        Companies company = companyRepository.findById(accountDto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        //3. tim role theo roleId
        Roles role = roleRepository.findById(accountDto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

    
      // 4. Sử dụng Builder (Đúng chuẩn với annotation @Builder bạn đã đặt ở Entity)
        Account account = Account.builder()
            .username(accountDto.getUsername())
            .password(passwordEncoder.encode(accountDto.getPassword()))
            .company(company)
            .role(role)
            .build(); // Đảm bảo không có trường ID nào bị set thủ công ở đây
        //5. luu account moi vao database
        accountRepository.save(account);

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
    public AccountDTO getAccountById(Long id){
        return accountRepository.findById(id)
                .map(account -> {
                    AccountDTO dto = new AccountDTO();
                    dto.setCompanyId(account.getCompany().getId());
                    dto.setUsername(account.getUsername());
                    dto.setPassword(account.getPassword());
                    dto.setRoleId(account.getRole().getId());
                    return dto;
                })
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    @Transactional(readOnly = true)
    public List<AccountDTO> getAllByCompanyId(Long companyIds){

        List<Account> accounts = accountRepository.findByCompanyId(companyIds);
        return accounts.stream()
                .map(account -> {
                    AccountDTO dto = new AccountDTO();
                    dto.setCompanyId(account.getCompany().getId());
                    dto.setUsername(account.getUsername());
                    dto.setPassword(account.getPassword());
                    dto.setRoleId(account.getRole().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AccountDTO> getAllAccounts(){
        return accountRepository.findAll()
                .stream()
                .map(account -> {
                    AccountDTO dto = new AccountDTO();
                    dto.setCompanyId(account.getCompany().getId());
                    dto.setUsername(account.getUsername());
                    dto.setRoleId(account.getRole().getId());
                    return dto;
                })
                .collect(Collectors.toList());
           
    }

    @Transactional
    public List<AccountDTO> searchAccounts(String param){
        return accountRepository.search(param)
                .stream()
                .map(account -> {
                    AccountDTO dto = new AccountDTO();
                    dto.setCompanyId(account.getCompany().getId());
                    dto.setUsername(account.getUsername());
                    dto.setPassword(account.getPassword());
                    dto.setRoleId(account.getRole().getId());
                    return dto;
                })
                .collect(Collectors.toList());
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
