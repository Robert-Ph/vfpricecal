package com.example.vfprint.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfitRequest {
    private UUID id;
    private UUID companyId;
    private String name;
    private float percentage;
}
