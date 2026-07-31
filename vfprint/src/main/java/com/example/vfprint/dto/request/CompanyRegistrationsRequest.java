package com.example.vfprint.dto.request;

import java.util.UUID;

import com.example.vfprint.enums.CustomType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CompanyRegistrationsRequest {

    private UUID id;
    private String fullName;
    private String userName;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String taxCode;
    private String status;
    private Timestamp createAt;
    private CustomType customType;
}
