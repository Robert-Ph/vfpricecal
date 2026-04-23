package com.example.vfprint.dto;

import lombok.Data;

@Data
public class InfoPriceDTO {
    private String widthProduct;
    private String heightProduct;
    private Integer quantity;
    private Long paperId;
    private Long paperSizeId;

}
