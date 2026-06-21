package com.example.vfprint.dto.system;

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
public class CompaniesRequest {
    private UUID id;
    private String code;
    private String name;
    private String phone;
    private String address;
    private String taxCode;
    private String email;
    private String statusId;
    private String plan;
    private String logoUrl;
    private Timestamp createAt;
    private Timestamp startTime;
    private Timestamp endTime;
    private Timestamp updateAt;
    private double priceMonth;

}
