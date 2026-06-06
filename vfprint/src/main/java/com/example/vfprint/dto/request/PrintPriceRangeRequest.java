package com.example.vfprint.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PrintPriceRangeRequest {
    private UUID id;
    private UUID printPriceId;
    private Float minLengthCm;
    private Float maxLengthCm;
    private double pricePerMeter;
}
