package com.example.vfprint.controller.publicWeb;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.service.system.SystemconfigService;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.dto.response.system.SystemConfigResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public")
public class PublicController {
    private final SystemconfigService systemconfigService;

    @GetMapping("/system-config")
    public ResponseEntity<ApiResponse> getAllSystemConfig() {
        ApiResponse<SystemConfigResponse> response = systemconfigService.getAllSystemConfig();
        if (response.getCode() == 404) {
            return ResponseEntity.status(404).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
