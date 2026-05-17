package com.example.vfprint.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfitRequest {
    private Long id;
    private Long companyId;
    private String name;
    private float percentage;
}
