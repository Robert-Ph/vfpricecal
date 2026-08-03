package com.example.vfprint.dto.system;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PlansRequest {
    private UUID id;
    private String name;
    private String code;
    private BigDecimal price;
    private Integer durationInDays;
    private Boolean isCustom;
    private Integer maxUsers;
    private Integer maxProducts;
    private Integer maxBranches;
    private String description;

}
