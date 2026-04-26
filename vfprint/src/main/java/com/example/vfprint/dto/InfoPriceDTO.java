package com.example.vfprint.dto;

import java.util.List;

import lombok.Data;

@Data
public class InfoPriceDTO {
    private int widthProduct;
    private int heightProduct;
    private Integer quantity;
    private List<Long> processingIds;
    private Long paperId;
    private Long paperSizeId;
    private Long companyId;

}
