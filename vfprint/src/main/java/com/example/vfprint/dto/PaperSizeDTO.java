package com.example.vfprint.dto;

import lombok.Data;

@Data
public class PaperSizeDTO {
    private Long id;
    private Long paperId;
    private int width;
    private int height;
    private Float price; // Giá của size này

}
