package com.example.vfprint.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaperResponse {
    private Long id;
    private Long companyId;
    private String name;
    private String gsm;
}
