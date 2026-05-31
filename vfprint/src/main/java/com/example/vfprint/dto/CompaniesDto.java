package com.example.vfprint.dto;

import java.util.UUID;
import lombok.Data;
import java.sql.Timestamp;

@Data
public class CompaniesDto {
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
