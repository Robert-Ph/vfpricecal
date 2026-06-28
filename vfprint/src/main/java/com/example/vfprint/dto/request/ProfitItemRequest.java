package com.example.vfprint.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ProfitItemRequest {
    private UUID id;
    private UUID profitId;
    private String name;
    private Double percent;
}
