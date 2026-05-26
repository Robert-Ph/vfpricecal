package com.example.vfprint.dto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaperDTO {
    private UUID id;
    private UUID companyId;
    private String name;
    private String gsm;
    private List<PaperSizeDTO> paperSizes;
}
