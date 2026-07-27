package com.example.vfprint.dto.response;

import java.sql.Timestamp;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponse {
    private String token;
    private UUID companyId;
    private String companyName;
    private String fullname;
    private String username;
    private UUID userId;
    private String plan;
    private String email;
    private String role;
    private String phone;
    private Timestamp startTime;
    private Timestamp endTime;
    private int maxUsers;
}
