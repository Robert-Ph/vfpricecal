package com.example.vfprint.service;

import java.util.Date;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.example.vfprint.entity.Account;
import com.example.vfprint.entity.Token;
import com.example.vfprint.repository.AccountRepository;
import com.example.vfprint.repository.TokenRepository;
import com.nimbusds.jose.JOSEException;
import java.text.ParseException;
import com.example.vfprint.dto.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthencaitonService {

    @Autowired
    private TokenRepository tokenRepository;
    
    @Autowired
    private AccountRepository accountRepository;

    public boolean authenticate(LoginRequest loginRequest) {
        // Thực hiện xác thực người dùng (ví dụ: kiểm tra username và password trong cơ sở dữ liệu)
        // Trả về true nếu xác thực thành công, ngược lại trả về false
        var account = accountRepository.findByUsername(loginRequest.getUsername()).orElseThrow();

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // Khởi tạo PasswordEncoder (ví dụ: BCryptPasswordEncoder)


        return passwordEncoder.matches(loginRequest.getPassword(), account.getPassword()); // Giả sử luôn xác thực thành công
    }

    //logout token
    public void logout(String token) throws JOSEException, ParseException {
        // Xóa token khỏi cơ sở dữ liệu hoặc đánh dấu token là không hợp lệ
        // Ví dụ: tokenRepository.deleteById(token);

        SignedJWT signedJWT = SignedJWT.parse(token);
        JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
        // Lấy thời gian hết hạn của token
        Date expirationTime = claimsSet.getExpirationTime();
        // Kiểm tra nếu token đã hết hạn
        if (expirationTime.before(new Date())) {
            // Token đã hết hạn, thực hiện các hành động cần thiết (ví dụ: xóa token khỏi cơ sở dữ liệu)
            // tokenRepository.deleteById(token);

        } else {
            // Token vẫn còn hiệu lực, có thể thực hiện các hành động khác nếu cần
        }

        Token tokenEntity = Token.builder()
                .token(token)
                .exDate(expirationTime)
                .build();
        // Lưu token vào cơ sở dữ liệu
        tokenRepository.save(tokenEntity);

    }
}
