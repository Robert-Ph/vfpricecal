package com.example.vfprint.service.system;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import com.example.vfprint.dto.response.system.SystemConfigResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.example.vfprint.config.Code;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.dto.system.SystemConfigRequest;
import com.example.vfprint.entity.system.SystemConfig;
import com.example.vfprint.repository.systemRepository.AccountSystemRepository;
import com.example.vfprint.repository.systemRepository.SystemConfigRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import com.example.vfprint.entity.system.AccountSystem;

@Service
@RequiredArgsConstructor
public class SystemconfigService {
    private final SystemConfigRepository systemConfigRepository;
    private final AccountSystemRepository accountSystemRepository;


    @Transactional
    public void createOrUpdateSystemConfig(SystemConfigRequest request) {
        Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();
        
            System.out.println(authentication.getName());

        AccountSystem accountSystem = accountSystemRepository.findByEmail(authentication.getName());
        SystemConfig systemConfig = SystemConfig.builder()
                .configKey(request.getConfigKey())
                .configValue(request.getConfigValue())
                .configType(request.getConfigType())
                .description(request.getDescription())
                .groupCode(request.getGroupCode())
                .updatedBy(accountSystem)
                .createAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();

        systemConfigRepository.save(systemConfig);
    }

    @Transactional
    public ApiResponse getAllSystemConfig() {
        List<SystemConfig> systemConfigs = systemConfigRepository.findAll();

        List<SystemConfigResponse> response = systemConfigs.stream()
                .map(config -> SystemConfigResponse.builder()
                        .id(config.getId())
                        .configKey(config.getConfigKey())
                        .configValue(config.getConfigValue())
                        .configType(config.getConfigType())
                        .description(config.getDescription())
                        .groupCode(config.getGroupCode())
                        .updatedBy(config.getUpdatedBy() != null ? config.getUpdatedBy().getName() : null)
                        .updateAt(config.getUpdateAt())
                        .isActive(config.isActive())
                        .build())
                .toList();
        if (systemConfigs.isEmpty()) {
            return ApiResponse.builder()
                    .code(Code.NOT_FOUND)
                    .message("No system configuration found")
                    .data(null)
                    .build();
        }
        return ApiResponse.builder()
                .code(Code.SUCCESS)
                .message("System configuration retrieved successfully")
                .data(response)
                .build();
    }

    @Transactional
    public String getValue(String key){
         return systemConfigRepository.findByConfigKey(key).getConfigValue();
    }
    @Transactional
    public Integer getInteger(String key){
         return Integer.valueOf(systemConfigRepository.findByConfigKey(key).getConfigValue());
    }

    @Transactional
    public boolean getBoolean(String key){
        if(systemConfigRepository.findByConfigKey(key).getConfigValue().equals("true")){
            return true;
        }
        return false;
    }
}
