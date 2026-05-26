package com.example.vfprint.dto.request;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaperRequest {
    private UUID companyId;
    private String name;
    private String gsm;
    private List<PaperSizeRequest> paperSizes;
}
