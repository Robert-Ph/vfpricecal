package com.example.vfprint.dto.quotation;

import lombok.Data;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaperSizeQuatation {
    private UUID id;
    private int width;
    private int height;
}
