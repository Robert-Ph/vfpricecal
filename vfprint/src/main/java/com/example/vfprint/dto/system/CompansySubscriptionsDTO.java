package com.example.vfprint.dto.system;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CompansySubscriptionsDTO {
    private UUID companyId;
    private UUID planId;
    private String time;
}
