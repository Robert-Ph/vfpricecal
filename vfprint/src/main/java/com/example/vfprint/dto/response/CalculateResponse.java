package com.example.vfprint.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalculateResponse {
    private BigDecimal price;
    private int quantityPaper;
    private int productSheet;
    private String paperSize;
    private BigDecimal processingCost;
    private BigDecimal discount;
    private BigDecimal paperCost;
    private BigDecimal cost;
}
