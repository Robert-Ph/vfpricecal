package com.example.vfprint.dto.response;

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
public class ProcessingTierReponse {
    private UUID id;
    private UUID processingId;
    private double minVolume;
    private double maxVolume;
    private double price;
    private double minCharge;
    private boolean isActive;
}
