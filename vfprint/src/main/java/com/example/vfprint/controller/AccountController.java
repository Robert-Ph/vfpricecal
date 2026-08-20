package com.example.vfprint.controller;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.vfprint.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.vfprint.dto.AccountDTO;
import com.example.vfprint.dto.response.ApiResponse;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/accounts")
public class AccountController {
    
    private final AccountService accountService;

    @GetMapping
    public List<AccountDTO> getAllAccounts(){
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public AccountDTO getAccountById(@PathVariable UUID id) {
        return accountService.getAccountById(id);
    }
    
    @GetMapping("/list/{id}")
    public ResponseEntity<ApiResponse> getAccountsByCompanyId(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .data(accountService.getAllByCompanyId(id))
            .build()
        );
    }
    

    @GetMapping("/search")
    public List<AccountDTO> searchAccounts(@RequestParam("param") String param){
        return accountService.searchAccounts(param);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createAccount(@RequestBody AccountDTO account){
        accountService.createAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.<Void>builder()
            .code(201)
            .message("Account created successfully")
            .build()
        );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable UUID id){
        accountService.deleteAccount(id);
        return ResponseEntity.ok("Account deleted");
    }
}
