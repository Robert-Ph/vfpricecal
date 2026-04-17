package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.repository.PaperRepository;
import com.example.vfprint.repository.PaperSizeRepository;

@Service
public class PaperService {
    
    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private PaperSizeRepository paperSizeRepository;


}
