package com.example.vfprint.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.dto.request.PublicFeedbackRequest;
import com.example.vfprint.entity.PublicFeedbacks;
import com.example.vfprint.repository.PublicFeedbacksRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicFeedbacksService {
    private final PublicFeedbacksRepository publicFeedbacksRepository;


    @Transactional
    public void sendPublicFeedback(PublicFeedbackRequest request){
        PublicFeedbacks result = PublicFeedbacks.builder()
                                    .fullName(request.getFullName())
                                    .phone(request.getPhone())
                                    .email(request.getEmail())
                                    .subject(request.getSubject())
                                    .content(request.getContent())
                                    .createAt(Timestamp.valueOf(LocalDateTime.now()))
                                    .build();

        publicFeedbacksRepository.save(result);
    }

}
