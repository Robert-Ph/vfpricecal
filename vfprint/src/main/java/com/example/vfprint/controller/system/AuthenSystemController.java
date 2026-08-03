package com.example.vfprint.controller.system;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.request.LoginRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.AuthenSystemService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/system/authen")
public class AuthenSystemController {
    private final AuthenSystemService authenSystemService;

    @PostMapping
    public ResponseEntity<ApiResponse> authenticate(@RequestBody LoginRequest request) {
        // Implement the authentication logic here
        return ResponseEntity.status(HttpStatus.OK).body(
            authenSystemService.authenticateResponse(request)
        );
    }
}
