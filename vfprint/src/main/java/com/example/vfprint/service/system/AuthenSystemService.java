package com.example.vfprint.service.system;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.vfprint.repository.systemRepository.AccountSystemRepository;
import com.nimbusds.jose.JOSEException;
import com.example.vfprint.repository.systemRepository.TokenSystemRepository;
import com.example.vfprint.dto.request.LoginRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.dto.response.system.AuthemSystemResponse;
import com.example.vfprint.entity.system.AccountSystem;
import com.example.vfprint.entity.system.TokenSystem;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import com.example.vfprint.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenSystemService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AccountSystemRepository accountRepository;
    private final TokenSystemRepository tokenRepository;
    
          /**
     * Check email/password
     */
    public boolean authenticate(LoginRequest loginRequest) {
        // Thực hiện xác thực người dùng (ví dụ: kiểm tra email và password trong cơ sở dữ liệu)
        // Trả về true nếu xác thực thành công, ngược lại trả về false
        AccountSystem account = accountRepository.findByEmail(loginRequest.getEmail().toLowerCase());
               

        return passwordEncoder.matches(loginRequest.getPassword(), account.getPassword());
    }

        //logout token
    public void logout(String token) throws JOSEException, ParseException {
       TokenSystem tokenEntity = tokenRepository.findById(token)
                            .orElseThrow(() -> 
                                    new RuntimeException("Token not found"));

        tokenEntity.setRevoked(true);
        tokenRepository.save(tokenEntity);
    }

    /**
     * Check token blacklist
     */
    public boolean isTokenValid(String token) {

        TokenSystem tokenEntity = tokenRepository
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

    private void revokeAllUserTokens(AccountSystem account) {

    List<TokenSystem> validTokens = tokenRepository.findByAccountIdAndRevokedFalse(account.getId());

    if (validTokens.isEmpty()) {
        return;
    }

    validTokens.forEach(token -> {
        token.setRevoked(true);
    });

    tokenRepository.saveAll(validTokens);
}

 /*
        login
     */
    public ApiResponse<AuthemSystemResponse> authenticateResponse(LoginRequest request) {

        boolean isAuthenticate = authenticate(request);

        if (!isAuthenticate) {
            throw new RuntimeException("Invalid credentials");
        }

        //  DeviceType deviceType = DeviceType.valueOf(request.getDeviceType());

        AccountSystem account = accountRepository.findByEmail(request.getEmail().toLowerCase());
                        

        // Thu hồi token cũ
        revokeAllUserTokens(account);

       
        // Tạo token mới
        String jwtToken = jwtService.generateTokenSystem(account);

        //save token DB
        TokenSystem token = TokenSystem.builder()
                        .id(jwtToken)
                        .exDate(jwtService.extractExpiration(jwtToken))
                        .revoked(false)
                        .account(account)
                        .build();
        
        tokenRepository.save(token);


        //response FE
        return ApiResponse.<AuthemSystemResponse>builder()
                .code(200)
                .message("Login successful")
                .data(AuthemSystemResponse.builder()
                        .token(jwtToken)
                        .email(account.getEmail())
                        .username(account.getName())
                        .role(account.getRole().getCode())
                        .build()
                )
                .build();
            

}
}
