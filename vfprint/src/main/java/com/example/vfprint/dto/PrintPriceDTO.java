package com.example.vfprint.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrintPriceDTO {
    private Long id;
    private Long companyId;
    private String name;
    private float price;
    private boolean isActive;
}
