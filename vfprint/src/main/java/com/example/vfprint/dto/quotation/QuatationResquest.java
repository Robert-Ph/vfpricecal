package com.example.vfprint.dto.quotation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class QuatationResquest {
    private UUID companyId;
    private List<PaperQuatation> papers;
    private List<CategoryQuatation> categories;
    private List<PrintPriceQuatation> printPrices;
    
}
