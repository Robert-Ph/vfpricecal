package com.example.vfprint.service;

import java.time.format.SignStyle;
import java.util.Date;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import ch.qos.logback.core.subst.Token;
import com.example.vfprint.entity.Token;
import com.example.vfprint.repository.TokenRepository;
import com.nimbusds.jose.JOSEException;
import java.text.ParseException;
import org.springframework.stereotype.Service;

@Service
public class AuthencaitonService {
    

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
    }
}
