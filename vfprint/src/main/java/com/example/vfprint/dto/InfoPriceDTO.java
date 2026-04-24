package com.example.vfprint.dto;

import lombok.Data;

@Data
public class InfoPriceDTO {
    private int widthProduct;
    private int heightProduct;
    private Integer quantity;
    private Long paperId;
    private Long paperSizeId;
    private Long companyId;

}
