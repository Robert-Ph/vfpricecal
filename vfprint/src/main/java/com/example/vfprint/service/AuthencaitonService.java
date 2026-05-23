package com.example.vfprint.service;

import java.util.Date;
import com.example.vfprint.entity.Account;
import com.example.vfprint.entity.Token;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.repository.TokenRepository;
import com.nimbusds.jose.JOSEException;
import java.text.ParseException;
import com.example.vfprint.dto.request.LoginRequest;
import com.example.vfprint.dto.response.AuthenticationResponse;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthencaitonService {

    @Autowired
    private TokenRepository tokenRepository;
    
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;


      /**
     * Check email/password
     */
    public boolean authenticate(LoginRequest loginRequest) {
        // Thực hiện xác thực người dùng (ví dụ: kiểm tra email và password trong cơ sở dữ liệu)
        // Trả về true nếu xác thực thành công, ngược lại trả về false
        Account account = accountRepository.findByEmail(loginRequest.getEmail())
                        .orElseThrow(() -> 
                        new NoSuchElementException("Email not found")    
                    );
        


        return passwordEncoder.matches(loginRequest.getPassword(), account.getPassword());
    }

    /*
        login
     */
    public AuthenticationResponse authenticateResponse(LoginRequest request) {

        boolean isAuthenticate = authenticate(request);

        if (!isAuthenticate) {
            throw new RuntimeException("Invalid credentials");
        }


        Account account = accountRepository.findByEmail(request.getEmail())
                        .orElseThrow(() -> 
                        new NoSuchElementException("Email not found")    
                    );

        //genarate JWT
        String jwtToken = jwtService.generateToken(account);

        //save token DB
        Token token = Token.builder()
                        .id(jwtToken)
                        .exDate(jwtService.extractExpiration(jwtToken))
                        .revoked(false)
                        .account(account)
                        .build();
        
        tokenRepository.save(token);


        //response FE
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .companyId(account.getCompany().getId())
            .username(account.getUsername())
            .email(account.getEmail())
            .role(account.getRole().getName()) // Gửi role để FE phân quyền Menu
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
}
