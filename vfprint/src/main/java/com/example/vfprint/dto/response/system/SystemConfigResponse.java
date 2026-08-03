package com.example.vfprint.dto.response.system;

import com.example.vfprint.enums.ConfigDataType;
import com.example.vfprint.enums.ConfigGroupCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import java.sql.Timestamp;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SystemConfigResponse {
    private UUID id;
    private String configKey;
    private String configValue;
    private ConfigDataType configType;
    private String description;
    private ConfigGroupCode groupCode;
    private String updatedBy;
    private Timestamp updateAt;
    private boolean isActive;
}
