package com.example.vfprint.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class DiscountRangeRequest {
    private UUID id;
    private UUID discountId;
    private Integer maxQuantity;
    private BigDecimal discount;
}
