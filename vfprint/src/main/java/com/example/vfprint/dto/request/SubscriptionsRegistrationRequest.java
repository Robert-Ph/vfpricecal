package com.example.vfprint.dto.request;


import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SubscriptionsRegistrationRequest {
    
    private UUID id;
    private UUID companyResId;
    private UUID planID;
    private int month;
    private Timestamp createAt;
    private String status;
}
