package com.example.vfprint.dto.quotation;

import lombok.Data;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CategoryQuatation {
    private UUID id;
    private String name;
    private List<ProcessingQuatation> processings;
}
