package com.example.vfprint.controller.system;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.dto.system.SystemConfigRequest;
import com.example.vfprint.service.system.SystemconfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/system/config")
public class SystemConfigController {
    private final SystemconfigService systemconfigService;

    @PostMapping
    public ResponseEntity<ApiResponse> createOrUpdateSystemConfig(@RequestBody SystemConfigRequest systemConfig) {
        systemconfigService.createOrUpdateSystemConfig(systemConfig);
        return ResponseEntity.ok(ApiResponse.builder().message("System configuration created or updated successfully.").build());
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllSystemConfig() {
        ApiResponse response = systemconfigService.getAllSystemConfig();
        if (response.getCode() == 404) {
            return ResponseEntity.status(404).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
