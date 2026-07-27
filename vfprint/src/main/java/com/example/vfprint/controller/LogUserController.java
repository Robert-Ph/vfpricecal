package com.example.vfprint.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.LogUserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/log-user")
public class LogUserController {
    private final LogUserService logUserService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllByCompany(@RequestParam("param") UUID param){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(200)
                .data(logUserService.getAllLogByCompany(param))
                .build()
        );
    }
}
