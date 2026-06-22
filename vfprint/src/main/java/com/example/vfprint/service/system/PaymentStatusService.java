package com.example.vfprint.service.system;


import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.dto.response.PaymentStatusReponse;
import com.example.vfprint.entity.system.PaymentStatus;
import com.example.vfprint.repository.systemRepository.PaymentStatusRepository;

@Service
public class PaymentStatusService {
    
    @Autowired
    private PaymentStatusRepository paymentStatusRepository;

    @Transactional
    public List<PaymentStatusReponse> getAllPaymentStatusAllowCreate(){
        List<PaymentStatus> paymentStatus = paymentStatusRepository.findByAllowCreate(true);
        return paymentStatus.stream()
        .map(pay -> PaymentStatusReponse.builder()
                    .id(pay.getId())
                    .name(pay.getName())
                    .code(pay.getCode())
                    .build())
                    .collect(Collectors.toList());
    }
}
