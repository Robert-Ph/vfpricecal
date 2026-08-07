package com.example.vfprint.controller.publicWeb;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.config.Code;
import com.example.vfprint.dto.request.PublicFeedbackRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.PublicFeedbacksService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/feedback")
public class PublicFeedbacksController {
    private final PublicFeedbacksService publicFeedbacksService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendFeedback(@RequestBody PublicFeedbackRequest request){
        publicFeedbacksService.sendPublicFeedback(request);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
                .code(Code.SUCCESS)
                .message("Thông tin của bạn đã được gửi thành công!")
                .build()   
        );
    }
}
