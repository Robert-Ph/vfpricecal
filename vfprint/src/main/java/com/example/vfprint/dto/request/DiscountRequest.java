package com.example.vfprint.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

import com.example.vfprint.enums.Priority;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class DiscountRequest {
    private UUID id;
    private UUID companyId;
    private String name;
    private boolean isActive;
    private List<DiscountRangeRequest> discountRanges;
    private Priority priority;
}
