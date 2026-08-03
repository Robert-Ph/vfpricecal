package com.example.vfprint.dto.response;

import java.sql.Timestamp;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OrdersResponse {
    private String companyName;
    private String companyCode;
    private String plansName;
    private Timestamp createAt;
    private BigDecimal totalAmount;
    private boolean isPay;
}
