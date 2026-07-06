package com.example.vfprint.dto.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AccountResponse {
    private UUID id;
    private UUID companyId;
    private String email;
    private String username;
    private String code;
    private String status;
}
