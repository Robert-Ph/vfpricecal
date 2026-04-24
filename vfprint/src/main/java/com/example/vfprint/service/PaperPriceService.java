package com.example.vfprint.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vfprint.dto.PaperPriceDTO;
import com.example.vfprint.entity.Paper;
import com.example.vfprint.entity.PaperPrice;
import com.example.vfprint.repository.PaperPriceRepository;


@Service
public class PaperPriceService {
    
    @Autowired
    private PaperPriceRepository paperPriceRepository;



    @Transactional
    public void createPaperPrice(PaperPriceDTO paperPrice){
        if (paperPriceRepository.existsByPaperSizeId(paperPrice.getPaperSizeId())) {
            throw new RuntimeException("Paper price for the given size already exists");
        }
        PaperPrice paperPriceEntity = PaperPrice.builder()
                .paperSizeId(paperPrice.getPaperSizeId())
                .price(paperPrice.getPrice())
                .build();
        paperPriceRepository.save(paperPriceEntity);
    }


    @Transactional
    public void deletePaperPrice(Long id){
        paperPriceRepository.deleteById(id);
        
    }


    @Transactional
    public List<PaperPrice> getAllPaperPrices(){
        return paperPriceRepository.findAll();
    }

    @Transactional
    public PaperPrice getPaperPriceDTO(Long paperSizeId){
       return paperPriceRepository.findByPaperSizeId(paperSizeId);
    }

}
