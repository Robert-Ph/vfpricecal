package com.example.vfprint.dto;

import java.util.List;

import lombok.Data;

@Data
public class PaperDTO {
    private Long companyId;
    private String name;
    private String gsm;
    private List<PaperSizeDTO> paperSizes;
}
