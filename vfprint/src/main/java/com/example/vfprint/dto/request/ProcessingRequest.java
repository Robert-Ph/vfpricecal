package com.example.vfprint.dto.request;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Data
public class ProcessingRequest {
    private UUID id;
    private UUID categoryId;
    private UUID companyId;
    private UUID accountId;
    private String name;
    private String unit;
    @JsonProperty("pTierRequests")
    private List<ProcessingTierRequest> pTierRequests;
}
