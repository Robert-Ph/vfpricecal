package com.example.vfprint.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;


import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import com.example.vfprint.entity.Token;
import com.example.vfprint.repository.TokenRepository;
import com.example.vfprint.service.JwtService;
import java.util.List;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        /**
         * STEP 1
         * lấy Authorization header
         */
        final String authHeader =
                request.getHeader("Authorization");

        /**
         * không có token
         */
        if (
                authHeader == null ||
                !authHeader.startsWith("Bearer ")
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        /**
         * STEP 2
         * lấy JWT
         */
        String jwt = authHeader.substring(7);
        
        System.out.println("JWT REQUEST = " + jwt);

        /**
         * STEP 3
         * verify JWT
         */
        boolean validJwt = jwtService.isTokenValid(jwt);
        System.out.println("VALID JWT = " + validJwt);

        if (!validJwt) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        /**
         * STEP 4
         * check blacklist token
         */
        Token tokenEntity =
                tokenRepository
                        .findById(jwt)
                        .orElse(null);

                        System.out.println("TOKEN ENTITY = " + tokenEntity);
        /**
         * token đã logout
         */
        if (tokenEntity != null && tokenEntity.isRevoked()) {
            System.out.println("TOKEN BỊ CHẶN VÌ ĐÃ REVOKED!");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        /**
        * STEP 5
        * Set Authentication cho Spring Security
        */
        String email = jwtService.extractEmail(jwt);

        // Lấy role từ JWT Claim an toàn
        Object roleClaim = jwtService.extractAllClaims(jwt).get("role");
        String role = roleClaim != null ? roleClaim.toString().trim().toUpperCase() : "";

        List<SimpleGrantedAuthority> authorities = List.of();

        if (!role.isEmpty()) {
                // Nếu chuỗi chưa bắt đầu bằng "ROLE_" thì mới thêm vào (ví dụ: ADMIN -> ROLE_ADMIN)
                String finalRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;
                authorities = List.of(new SimpleGrantedAuthority(finalRole));
        }

        // In ra log để bạn tiện theo dõi ở console khi test
        System.out.println("--- CHECK QUYỀN USER ---");
        System.out.println("User Email: " + email);
        System.out.println("Quyền thực tế được gán: " + authorities);
        System.out.println("------------------------");

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        authorities
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);


        /**
         * STEP 6
         * cho request đi tiếp
         */
        filterChain.doFilter(
                request,
                response
        );
    }
}