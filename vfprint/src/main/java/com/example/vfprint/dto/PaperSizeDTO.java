package com.example.vfprint.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class PaperSizeDTO {
    private UUID id;
    private Long paperId;
    private int width;
    private int height;
    private Float price; // Giá của size này

}
