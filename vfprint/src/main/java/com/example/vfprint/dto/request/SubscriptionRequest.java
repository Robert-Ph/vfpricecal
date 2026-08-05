package com.example.vfprint.dto.request;

import java.util.UUID;
import com.example.vfprint.dto.system.CompansySubscriptionsDTO;
import com.example.vfprint.enums.ActionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SubscriptionRequest {
    private UUID paymentStatus;
    private ActionType type;
    private CompanyRequest companyRes;
    private CompansySubscriptionsDTO sub;

}
