package com.example.vfprint.dto.system;

import java.util.UUID;

import com.example.vfprint.enums.CustomType;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CompaniesReponse {
    private UUID id;
    private String code;
    private String userName;
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
    private BigDecimal priceMonth;
    private CustomType sCustomType;
}
