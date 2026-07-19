package com.example.vfprint.controller;

import com.example.vfprint.service.AuthencaitonService;
import com.nimbusds.jose.JOSEException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import java.text.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.config.Code;
import com.example.vfprint.dto.request.LoginRequest;
import com.example.vfprint.dto.response.ApiResponse;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthencaitonController {
    
    private final AuthencaitonService authencaitonService;


    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse
            .builder()
            .code(Code.SUCCESS)
            .message("Login successful")
            .data(authencaitonService.authenticateResponse(request, httpRequest))
            .build()
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@RequestHeader("Authorization") String authHeader) throws JOSEException, ParseException {
        String token = authHeader.substring(7);

        authencaitonService.logout(token);;

    return ResponseEntity.ok(

            ApiResponse.builder()
                    .code(200)
                    .message("Logout successful")
                    .build()
    );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        authencaitonService.forgotPassword(email);
        return ResponseEntity.ok(
            ApiResponse.builder()
            .code(200)
            .message("Mật khẩu mới sẽ được gửi nếu email của bạn tồn tại trên hệ thống.")
            .build()
        );
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String newPassword = payload.get("newPassword");

        String result = authencaitonService.changePassword(email,  newPassword);
        return ResponseEntity.ok(
            ApiResponse.builder()
            .code(200)
            .message(result)
            .build()
        );
    }
}
