package com.example.vfprint.dto;

import java.util.UUID;
import java.math.BigDecimal;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaperSizeDTO {
    private UUID id;
    private UUID paperId;
    private int width;
    private int height;
    private BigDecimal price; // Giá của size này

}
