package com.example.vfprint.dto.quotation;

import lombok.Data;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PrintPriceQuatation {
    private UUID id;
    private String name;
    private double price;
}
