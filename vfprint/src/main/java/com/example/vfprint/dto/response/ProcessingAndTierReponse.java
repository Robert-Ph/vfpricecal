package com.example.vfprint.dto.response;

import java.util.List;
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
public class ProcessingAndTierReponse {
    private UUID id;
    private UUID categoryId;
    private String name;
    private String unit;
    private List<ProcessingTierReponse> tierReponses;
}
