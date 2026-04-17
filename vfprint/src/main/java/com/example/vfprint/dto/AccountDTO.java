package com.example.vfprint.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class AccountDTO {
    private Long companyId;
    private String username;
    private String password;
    private Long roleId;
}
