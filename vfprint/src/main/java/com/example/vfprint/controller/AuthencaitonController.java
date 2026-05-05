package com.example.vfprint.controller;

import com.example.vfprint.service.AuthencaitonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
            .data(authencaitonService.authenticate(request))
            .build()
        );
    }
}
