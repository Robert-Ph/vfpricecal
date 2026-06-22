package com.example.vfprint.dto.request;

import java.util.UUID;
import com.example.vfprint.dto.system.CompansySubscriptionsDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaymentRequest {
    private UUID paymentStatus;
    private String type;
    private CompanyRequest companyRes;
    private CompansySubscriptionsDTO sub;

}
