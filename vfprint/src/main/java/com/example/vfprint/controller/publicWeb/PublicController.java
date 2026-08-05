package com.example.vfprint.controller.publicWeb;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.service.system.PlansService;
import com.example.vfprint.service.system.SubscriptionService;
import com.example.vfprint.service.system.SystemconfigService;
import com.example.vfprint.config.Code;
import com.example.vfprint.dto.request.SubscriTrailOrBetaRequest;
import com.example.vfprint.dto.request.SubscriptionRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.dto.response.system.SystemConfigResponse;
import com.example.vfprint.dto.system.PlansResponse;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public")
public class PublicController {
    private final SystemconfigService systemconfigService;
    private final SubscriptionService subscriptionService;
    private final PlansService plansService;

    @GetMapping("/system-config")
    public ResponseEntity<ApiResponse> getAllSystemConfig() {
        ApiResponse<SystemConfigResponse> response = systemconfigService.getAllSystemConfig();
        if (response.getCode() == 404) {
            return ResponseEntity.status(404).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/plan")
    public ResponseEntity<ApiResponse> getAllPlan(){
        List<PlansResponse> plansResponse = plansService.getAllPlansRequest();
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(Code.SUCCESS)
                .data(plansResponse)
                .build()
        );
    }

    @PostMapping("/subscrition")
    public ResponseEntity<ApiResponse> subscrition(@RequestBody SubscriptionRequest request){

        try{
            subscriptionService.createNewSubscription(request);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(200)
                .message("Subscrition success")
                .build()
        );
        }catch(DataIntegrityViolationException e){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(
                    ApiResponse.builder()
                        .code(Code.CONFLICT)
                        .message(e.getMessage())
                        .build()
                );
        }
        
    }

    @PostMapping("/trail")
    public ResponseEntity<ApiResponse> subscritionTrail(@RequestBody SubscriTrailOrBetaRequest request){

        try{
            subscriptionService.createSubTrailOrBeta(request);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(200)
                .message("Subscrition success")
                .build()
        );
        }catch(DataIntegrityViolationException e){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(
                    ApiResponse.builder()
                        .code(Code.CONFLICT)
                        .message(e.getMessage())
                        .build()
                );
        }
        
    }




}
