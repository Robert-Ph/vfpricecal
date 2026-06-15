package com.example.vfprint.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt là chuẩn mã hóa mật khẩu phổ biến và an toàn nhất hiện nay
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain( HttpSecurity http) throws Exception {
        http

                /**
                 * CORS
                 */
                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                /**
                 * Disable CSRF
                 */
                .csrf(csrf -> csrf.disable())

                /**
                 * JWT không dùng session
                 */
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                /**
                 * Permission
                 */
                .authorizeHttpRequests(auth -> auth

                        /**
                         * Public API
                         */
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/companies/**",
                                "/api/accounts/**",
                                "/api/system/**",
                                "/api/bao-gia/**",
                                "/api/plans/**"
                                
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/category/**", "/api/processing/**").permitAll()
                        // .requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/api/processing/**")).permitAll()
                        /**
                        * 2. API phân quyền nội bộ công ty (Cần đăng nhập)
                        */
                        // Bảng giá in ấn và Giảm giá: Cả Admin và User của công ty đều xem được
                        .requestMatchers("/api/print-prices/**").hasAnyRole("OWNER", "STAFF")
                        .requestMatchers("/api/discount/**").hasAnyRole("OWNER", "STAFF")
                        .requestMatchers("/api/profit/**").hasAnyRole("OWNER", "STAFF")
                        .requestMatchers("/api/paper-sizes/**").hasAnyRole("OWNER", "STAFF")
                        .requestMatchers("/api/papers/**").hasAnyRole("OWNER", "STAFF")
                        .requestMatchers("/api/category/**").hasAnyRole("OWNER", "STAFF")
                        .requestMatchers("/api/role/**").hasAnyRole("OWNER", "STAFF")
                        .requestMatchers("/api/processing/**").hasAnyRole("OWNER", "STAFF")

                        /**
                         * Protected API
                         */
                        .anyRequest()
                        .authenticated()
                )

                /**
                 * Add JWT Filter
                 */
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
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
        "http://localhost:5172",
        "https://vfprice.vfltprinteco.com",
        "http://vfprice.vfltprinteco.com"
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
