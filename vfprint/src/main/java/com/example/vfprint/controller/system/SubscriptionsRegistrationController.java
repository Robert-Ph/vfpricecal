package com.example.vfprint.controller.system;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.dto.request.SubscriptionsRegistrationRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.system.temp.SubscriptionsRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/system/register/plan")
public class SubscriptionsRegistrationController {
    
    private final SubscriptionsRegistrationService subscriptionsRegistrationService;

    @PostMapping
    public ResponseEntity<ApiResponse> createSubRegistration(@RequestBody SubscriptionsRegistrationRequest registrationRequest){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(200)
                .data(subscriptionsRegistrationService.createRegistrationPlan(registrationRequest))
                .build()   
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getSubRegisById(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(200)
                .data(subscriptionsRegistrationService.getRegistration(id))
                .build()   
        );
    }
}
