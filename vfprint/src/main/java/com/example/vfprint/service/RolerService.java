package com.example.vfprint.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import com.example.vfprint.dto.response.RolesResponse;
import com.example.vfprint.entity.Roles;
import com.example.vfprint.repository.RolesRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RolerService {
    
    private final RolesRepository roleRepository;

@Transactional(readOnly = true)
public List<RolesResponse> getAllRoles() {
    List<Roles> roles = roleRepository.findAll();

    return roles.stream()
            .filter(role -> !"OWNER".equals(role.getName()))
            .map(role -> RolesResponse.builder()
                    .id(role.getId())
                    .name(role.getName())
                    .code(role.getCode())
                    .build())
            .collect(Collectors.toList());
    }
}
