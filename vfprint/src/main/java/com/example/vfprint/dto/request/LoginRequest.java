package com.example.vfprint.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {
    @NotNull(message = "Email không được null")
    @NotEmpty(message = "Email không được để trống")
    String email;

    @NotNull(message = "Password không được null")
    @NotEmpty(message = "Password không được để trống")
    String password;
}
