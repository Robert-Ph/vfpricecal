package com.example.vfprint.dto.request;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogUserRequest {
    private UUID id;
    private UUID companyId;
}
