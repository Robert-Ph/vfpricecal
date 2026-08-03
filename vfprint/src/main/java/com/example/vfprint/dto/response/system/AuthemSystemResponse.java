package com.example.vfprint.dto.response.system;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthemSystemResponse {
    private String token;
    private String username;
    private String email;
    private String role;
}
