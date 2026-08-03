package com.example.vfprint.dto.system;

import com.example.vfprint.entity.UserStatus;
import com.example.vfprint.entity.system.RolesSystem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Getter
@Setter
public class AccountSystemRequest {
    private String email;
    private String name;
    private RolesSystem role;
    private UserStatus userStatus;
}
