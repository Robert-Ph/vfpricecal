package com.example.vfprint.dto.response;


import java.util.UUID;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.vfprint.enums.Priority;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfitResponse {
    private UUID id;
    private UUID companyId;
    private String name;
    private Priority priority;
    private List<ProfitItemResponse> itemList;
}
