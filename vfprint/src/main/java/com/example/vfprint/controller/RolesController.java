package com.example.vfprint.controller;

import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.vfprint.service.RolerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import com.example.vfprint.dto.response.ApiResponse;
import java.util.List;
import com.example.vfprint.dto.response.RolesResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roles")
public class RolesController {
    
    private final RolerService rolerService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllRoles() {
        List<RolesResponse> roles = rolerService.getAllRoles();
        return ResponseEntity.ok(
            ApiResponse.builder()
            .code(200)
            .message("Roles retrieved successfully")
            .data(roles)
            .build()
        );
    }
}
