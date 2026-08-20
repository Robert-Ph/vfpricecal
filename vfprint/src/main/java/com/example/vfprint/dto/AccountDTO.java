package com.example.vfprint.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class AccountDTO {
    private UUID companyId;
    private UUID accountId;
    private String email;
    private String username;
    private String password;
    private UUID roleId;
    private UUID statusId;
}
