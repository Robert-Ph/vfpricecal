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
public class PlansRequest {
    private UUID id;
    private String code;
    private String name;
    private float price;

}
