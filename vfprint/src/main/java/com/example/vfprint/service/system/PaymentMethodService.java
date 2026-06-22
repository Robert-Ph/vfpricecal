package com.example.vfprint.service.system;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.response.PaymentMethodResponse;
import com.example.vfprint.entity.system.PaymentMethod;
import com.example.vfprint.repository.systemRepository.PaymentMethodRepository;

@Service
public class PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;


    @Transactional
    public List<PaymentMethodResponse> getAllPaymentMethod(){
        List<PaymentMethod> paymentMethod = paymentMethodRepository.findAll();
        return paymentMethod.stream()
                    .map(pay -> PaymentMethodResponse.builder()
                                .id(pay.getId())
                                .code(pay.getCode())
                                .name(pay.getName())
                                .descprition(pay.getDescprition())
                                .createAt(pay.getCreateAt())
                                .build())
                    .collect(Collectors.toList());                   
    }
    
}
