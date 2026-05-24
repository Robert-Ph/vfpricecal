package com.example.vfprint.controller;

import com.example.vfprint.service.AuthencaitonService;
import com.nimbusds.jose.JOSEException;
import java.text.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/api/auth")
public class AuthencaitonController {
    
    @Autowired
    private AuthencaitonService authencaitonService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse
            .builder()
            .code(Code.SUCCESS)
            .message("Login successful")
            .data(authencaitonService.authenticateResponse(request))
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
}
