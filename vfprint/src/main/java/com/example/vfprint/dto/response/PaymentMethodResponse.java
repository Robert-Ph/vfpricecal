package com.example.vfprint.dto.response;

import java.sql.Timestamp;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaymentMethodResponse {
    private UUID id;
    private String name;
    private String code;
    private String descprition;
    private Timestamp createAt;
}
