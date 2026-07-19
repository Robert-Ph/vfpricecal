package com.example.vfprint.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ProcessingTierRequest {
    private UUID id;
    private UUID processingId;
    private int minVolume;
    private int maxVolume;
    private double price;
    private double minCharge;
    private boolean isActive;

}
