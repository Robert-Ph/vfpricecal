package com.example.vfprint.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt là chuẩn mã hóa mật khẩu phổ biến và an toàn nhất hiện nay
        return new BCryptPasswordEncoder();
    }


   @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        // 1. Kích hoạt cấu hình CORS
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        
        // 2. Tắt CSRF (Bắt buộc để gọi POST/PUT/DELETE từ bên ngoài)
        .csrf(csrf -> csrf.disable()) 
        
        // 3. Quản lý quyền truy cập
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll() // Cho phép công khai API login
            .anyRequest().permitAll() // Tạm thời cho phép tất cả để debug
        );

    return http.build();
}

// Hàm bổ trợ để định nghĩa chi tiết luật CORS
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    // Danh sách các domain FE của bạn
    configuration.setAllowedOrigins(List.of(
        "http://localhost:5174",
        "http://localhost:5173",
        "http://localhost:5172"
    ));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration); // Áp dụng cho tất cả các endpoint
    return source;
}
}
