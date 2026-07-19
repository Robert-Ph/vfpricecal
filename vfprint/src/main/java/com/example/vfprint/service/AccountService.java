package com.example.vfprint.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.example.vfprint.entity.Roles;
import com.example.vfprint.entity.UserStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.config.EmailService;
import com.example.vfprint.config.UltiService;
import com.example.vfprint.dto.AccountDTO;
import com.example.vfprint.dto.response.AccountResponse;
import com.example.vfprint.entity.Account;
import com.example.vfprint.entity.Companies;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.repository.RolesRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.vfprint.repository.UserStatusREpository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {
    
  
    private final AccountRepository accountRepository;
    private final CompaniesRepository companyRepository;
    private final RolesRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserStatusREpository userStatusRepository;
    private final EmailService emailService;
    private final UltiService ultiService;


    // Create a new account with encoded password
    @Transactional
    public void createAccount(AccountDTO accountDto){
        //1. kiem tra email da ton tai chua
        if (accountRepository.existsByEmail(accountDto.getEmail().toLowerCase())) {
            throw new RuntimeException("Email already exists");
            
        }

        //2. tim company theo companyId
        Companies company = companyRepository.findById(accountDto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        //3. tim role theo roleId
        Roles role = roleRepository.findById(accountDto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

    
        UserStatus activeStatus = userStatusRepository.findByCode("ACTIVE")
                .orElseThrow(() -> new RuntimeException("User status not found"));
        

        // sinh password ngau nhien cho account moi
        String newPassword = ultiService.generateRandomPassword();
      // 4. Sử dụng Builder (Đúng chuẩn với annotation @Builder bạn đã đặt ở Entity)
        Account account = Account.builder()
            .email(accountDto.getEmail().toLowerCase())
            .username(accountDto.getUsername())  
            .password(passwordEncoder.encode(newPassword))
            .company(company)
            .role(role)
            .status(activeStatus) // Hoặc lấy từ DTO nếu bạn muốn cho phép set status khi tạo
            .build(); // Đảm bảo không có trường ID nào bị set thủ công ở đây
        //5. luu account moi vao database
        accountRepository.save(account);
        emailService.sendPasswordNewAccount(account.getEmail().toLowerCase(), newPassword);

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
    public void deleteAccount(UUID id){
        accountRepository.deleteById(id);
    }

    // Retrieve an account by ID
    @Transactional(readOnly = true)
    public AccountDTO getAccountById(UUID id){
        return accountRepository.findById(id)
                .map(account -> {
                    AccountDTO dto = new AccountDTO();
                    dto.setCompanyId(account.getCompany().getId());
                    dto.setEmail(account.getEmail());
                    dto.setPassword(account.getPassword());
                    dto.setRoleId(account.getRole().getId());
                    dto.setStatusId(account.getStatus().getId());
                    return dto;
                })
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    @Transactional(readOnly = true)
    public List<AccountResponse> getAllByCompanyId(UUID companyIds){

        List<Account> accounts = accountRepository.findByCompanyId(companyIds);
        return accounts.stream()
                .map(account -> 
                    AccountResponse.builder()
                    .id(account.getId())
                    .companyId(account.getCompany().getId())
                    .email(account.getEmail())
                    .username(account.getUsername())
                    .code(account.getRole().getName())
                    .status(account.getStatus().getName())
                    .build()
                )
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AccountDTO> getAllAccounts(){
        return accountRepository.findAll()
                .stream()
                .map(account -> {
                    AccountDTO dto = new AccountDTO();
                    dto.setCompanyId(account.getCompany().getId());
                    dto.setEmail(account.getEmail());
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



    // Check if an email already exists
    @Transactional(readOnly = true)
    public boolean checkEmailExists(String email){
        return accountRepository.findByEmail(email).isPresent();
    }


    // Validate raw password against encoded password
    @Transactional
    public boolean checkPassword(String rawPassword, String encodedPassword){
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }




}
