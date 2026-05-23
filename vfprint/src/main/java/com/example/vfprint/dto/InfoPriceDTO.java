package com.example.vfprint.dto;

import java.util.List;
import java.util.UUID;

import com.example.vfprint.dto.request.CalculateRequest;

import lombok.Data;

@Data
public class InfoPriceDTO {
    private int widthProduct;
    private int heightProduct;
    private Integer quantity;
    private List<CalculateRequest> processingIds;
    private Long paperId;
    private UUID paperSizeId;
    private Long companyId;
    private Long printPrice;
    private Long profit;
    private Long discount;

}
