package com.example.vfprint.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import com.example.vfprint.dto.request.PrintPriceRangeRequest;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrintPriceDTO {
    private UUID id;
    private UUID companyId;
    private String name;
    private String unit;
    private boolean isActive;
    private List<PrintPriceRangeRequest> printPriceRanges;
}
