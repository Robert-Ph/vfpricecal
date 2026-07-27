package com.example.vfprint.service;

import java.util.Date;
import com.example.vfprint.entity.Account;
import com.example.vfprint.entity.Token;
import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.repository.TokenRepository;
import com.example.vfprint.repository.systemRepository.CompansySubscriptionsRepository;
import com.nimbusds.jose.JOSEException;

import jakarta.servlet.http.HttpServletRequest;

import com.example.vfprint.enums.DeviceType;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.repository.CompaniesRepository;
import java.util.List;
import java.sql.Timestamp;
import java.text.ParseException;
import com.example.vfprint.dto.request.LoginRequest;
import com.example.vfprint.dto.response.AuthenticationResponse;
import java.util.NoSuchElementException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.config.EmailService;
import com.example.vfprint.config.UltiService;
import com.example.vfprint.entity.Companies;

@Service
@RequiredArgsConstructor
public class AuthencaitonService {

    private final TokenRepository tokenRepository;

    private final CompaniesRepository companyRepository;
    
    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final EmailService emailService;

    private final UltiService ultiService;

    private final CompansySubscriptionsRepository compansySubscriptionsRepository;




      /**
     * Check email/password
     */
    public boolean authenticate(LoginRequest loginRequest) {
        // Thực hiện xác thực người dùng (ví dụ: kiểm tra email và password trong cơ sở dữ liệu)
        // Trả về true nếu xác thực thành công, ngược lại trả về false
        Account account = accountRepository.findByEmail(loginRequest.getEmail().toLowerCase())
                        .orElseThrow(() -> 
                        new NoSuchElementException("Email not found")    
                    );
    

        return passwordEncoder.matches(loginRequest.getPassword(), account.getPassword());
    }

    /*
        login
     */
    public AuthenticationResponse authenticateResponse(LoginRequest request, HttpServletRequest httpRequest) {

        boolean isAuthenticate = authenticate(request);

        if (!isAuthenticate) {
            throw new RuntimeException("Invalid credentials");
        }

        String mobileHeader = httpRequest.getHeader("sec-ch-ua-mobile");
        String platformHeader = httpRequest.getHeader("sec-ch-ua-platform");

        DeviceType deviceType;

        if ("?1".equals(mobileHeader)) {
            deviceType = DeviceType.MOBILE;
        } else {
            deviceType = DeviceType.WEB;
        }

        //  DeviceType deviceType = DeviceType.valueOf(request.getDeviceType());

        Account account = accountRepository.findByEmail(request.getEmail().toLowerCase())
                        .orElseThrow(() -> 
                        new NoSuchElementException("Email not found")    
                    );

        // Thu hồi token cũ
        revokeAllUserTokens(account, deviceType);

       
        // Tạo token mới
        String jwtToken = jwtService.generateToken(account, deviceType);

        //save token DB
        Token token = Token.builder()
                        .id(jwtToken)
                        .exDate(jwtService.extractExpiration(jwtToken))
                        .revoked(false)
                        .account(account)
                        .build();
        
        tokenRepository.save(token);


        Companies company = companyRepository.findById(account.getCompany().getId())
                        .orElseThrow(() -> 
                        new NoSuchElementException("Company not found")    
                    );

        String plan = "";
        Timestamp start = null;
        Timestamp end = null;
        int maxUsers = 0;

        CompansySubscriptions subscriptionOpt = getSubscriptionsByActive(company);

        if (subscriptionOpt != null) {
            plan = subscriptionOpt.getPlan().getCode();
            start = subscriptionOpt.getStartDate();
            end = subscriptionOpt.getEndDate();
            maxUsers = subscriptionOpt.getPlan().getMaxUsers();
        } else {
         // Logic dự phòng (fallback): Nếu không có gói thì gán mặc định là gói FREE chẳng hạn
            plan = "FREE"; 
        }
        //response FE
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .companyId(account.getCompany().getId())
            .companyName(company.getCode())
            .username(account.getUsername())
            .userId(account.getId())
            .email(account.getEmail())
            .role(account.getRole().getName()) // Gửi role để FE phân quyền Menu
            .phone(company.getPhone())
            .fullname(company.getName())
            .plan(plan)
            .startTime(start)
            .endTime(end)
            .maxUsers(maxUsers)
            .build();

}

    //logout token
    public void logout(String token) throws JOSEException, ParseException {
       Token tokenEntity = tokenRepository.findById(token)
                            .orElseThrow(() -> 
                                    new RuntimeException("Token not found"));

        tokenEntity.setRevoked(true);
        tokenRepository.save(tokenEntity);
    }

    /**
     * Check token blacklist
     */
    public boolean isTokenValid(String token) {

        Token tokenEntity = tokenRepository
                .findById(token)
                .orElse(null);

        if (tokenEntity == null) {
            return false;
        }

        if (tokenEntity.isRevoked()) {
            return false;
        }

        return tokenEntity.getExDate()
                .after(new Date());
    }

    @Transactional
    public void forgotPassword(String email) {
        String trimmedEmail = email.trim();
        Account account = accountRepository.findByEmail(trimmedEmail)
                        .orElseThrow(() -> 
                        new NoSuchElementException("Email not found")    
                    );

        // Generate a new random password (you can use a more secure method in production)
        String newPassword = ultiService.generateRandomPassword();

        // Update the account with the new password (remember to encode it)
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);

        // Send the new password to the user's email
        emailService.sendNewPasswordEmail(trimmedEmail, newPassword);
    }


    @Transactional
    public String changePassword(String email, String newPassword) {
        String trimmedEmail = email.trim();
        Account account = accountRepository.findByEmail(trimmedEmail)
                        .orElseThrow(() -> 
                        new NoSuchElementException("Email not found")    
                    );

        // Check if the old password matches
        if (passwordEncoder.matches(newPassword, account.getPassword())) {
            return "Mật khẩu mới trùng với mật khẩu cũ";
        }

        // Update the account with the new password (remember to encode it)
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
        return "Password changed successfully";
    }



    public CompansySubscriptions getSubscriptionsByActive(Companies company){
        CompansySubscriptions result = new CompansySubscriptions();
        List<CompansySubscriptions> subscriptions = compansySubscriptionsRepository.findByCompany(company);
        for(CompansySubscriptions sub: subscriptions){
                if (sub.getSubscriptionStatus().getCode().equals("ACTIVE")) {
                        result = sub;
                }
        }
        return result;
}


private void revokeAllUserTokens(Account account, DeviceType deviceType) {

    List<Token> validTokens = tokenRepository.findByAccountIdAndDeviceTypeAndRevokedFalse(account.getId(), deviceType);

    if (validTokens.isEmpty()) {
        return;
    }

    validTokens.forEach(token -> {
        token.setRevoked(true);
    });

    tokenRepository.saveAll(validTokens);
}
}
