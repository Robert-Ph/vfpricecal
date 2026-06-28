package com.example.vfprint.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalculateResponse {
    private double price;
    private int quantityPaper;
    private int productSheet;
    private String paperSize;
    private double processingCost;
    private double discount;
    private double paperCost;
    private double cost;
}
