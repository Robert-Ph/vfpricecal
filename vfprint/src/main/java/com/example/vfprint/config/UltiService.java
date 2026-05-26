package com.example.vfprint.config;

import java.security.SecureRandom;
import org.springframework.stereotype.Service;

@Service
public class UltiService {
    

    public String generateRandomPassword() {
        String uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "@#$%&*!_";
    
        String totalChars = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
    
        // Dùng SecureRandom thay cho Random để tăng tính bảo mật chống đoán mò
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();
    
        // Tạo mật khẩu có độ dài 10 ký tự
        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(totalChars.length());
            password.append(totalChars.charAt(randomIndex));
        }
        
        return password.toString();
        // Ví dụ kết quả: kR9$m_P2@x
    }
}
