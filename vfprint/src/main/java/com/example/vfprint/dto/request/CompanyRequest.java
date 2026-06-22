package com.example.vfprint.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data

public class CompanyRequest {
    private UUID id;
    private String code;
    private String name;
    private String phone;
    private String address;
    private String taxCode;
    private String email;
    private UUID statusId;
    private String logoUrl;
    private Timestamp createAt;
    private Timestamp updateAt;
}
