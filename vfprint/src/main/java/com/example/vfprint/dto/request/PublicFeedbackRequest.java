package com.example.vfprint.dto.request;

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
public class PublicFeedbackRequest {
    private String fullName;
    private String email;
    private String phone;
    private String subject;
    private String content;
}
