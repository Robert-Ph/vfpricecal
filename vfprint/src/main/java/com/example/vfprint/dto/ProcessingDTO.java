package com.example.vfprint.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcessingDTO {
    private UUID id;
    private UUID categoryId;
    private String name;
    private float price;
}
