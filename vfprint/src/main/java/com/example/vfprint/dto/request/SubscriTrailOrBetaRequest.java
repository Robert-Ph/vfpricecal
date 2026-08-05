package com.example.vfprint.dto.request;

import java.util.UUID;

import com.example.vfprint.enums.CustomType;

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
@Data
@Builder
public class SubscriTrailOrBetaRequest {
    private CustomType customType;
    private String fullName;
    private String email;
    private String phone;
    private String company;
    private String tradeName;
    private UUID statusId;
}
