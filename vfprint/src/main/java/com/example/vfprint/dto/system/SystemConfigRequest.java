package com.example.vfprint.dto.system;

import com.example.vfprint.entity.system.AccountSystem;
import com.example.vfprint.enums.ConfigDataType;
import com.example.vfprint.enums.ConfigGroupCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SystemConfigRequest {
    
    private String configKey;
    private String configValue;
    private ConfigDataType configType;
    private String description;
    private ConfigGroupCode groupCode;
    private boolean isActive;
}
