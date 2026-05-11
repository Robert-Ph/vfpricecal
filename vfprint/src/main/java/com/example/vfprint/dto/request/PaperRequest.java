package com.example.vfprint.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaperRequest {
    private Long companyId;
    private String name;
    private String gsm;
    private List<PaperSizeRequest> paperSizes;
}
