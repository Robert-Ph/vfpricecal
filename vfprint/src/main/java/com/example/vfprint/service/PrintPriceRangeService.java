package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.repository.PrintPriceRangeRepository;

@Service
public class PrintPriceRangeService {
    
    @Autowired
    private PrintPriceRangeRepository printPriceRangeRepository;
}
