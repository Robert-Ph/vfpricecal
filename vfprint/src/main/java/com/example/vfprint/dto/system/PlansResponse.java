package com.example.vfprint.dto.system;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Timestamp;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PlansResponse {
    private UUID id;
    private String name;
    private String code;
    private BigDecimal price;
    private Integer durationInDays;
    private Boolean isCustom;
    private Integer maxUsers;
    private Integer maxProducts;
    private Integer maxBranches;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String description;
}
