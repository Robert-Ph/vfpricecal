package com.example.vfprint.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.entity.PaperSize;
import com.example.vfprint.repository.PaperSizeRepository;

@Service
public class PaperSizeService {
    
    @Autowired
    private PaperSizeRepository paperSizeRepository;


    @Transactional
    public List<PaperSize> getAllPaperSizes(){
        return paperSizeRepository.findAll();
    }

    @Transactional
    public PaperSize createPaperSize(PaperSize paperSize){
        return paperSizeRepository.save(paperSize);
    }

    @Transactional
    public PaperSize updatePaperSize(PaperSize paperSize){
        PaperSize existingPaperSize = paperSizeRepository.findById(paperSize.getId())
                .orElseThrow(() -> new RuntimeException("Paper size not found"));
        
        existingPaperSize.setWidth(paperSize.getWidth());
        existingPaperSize.setHeight(paperSize.getHeight());
        
        return paperSizeRepository.save(existingPaperSize);
    }

    @Transactional
    public void deletePaperSize(Long id){
        paperSizeRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public PaperSize getPaperSizeById(Long id){
        return paperSizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paper size not found"));
    }

    @Transactional
    public List<PaperSize> searchPaperSizes(String param){
        return paperSizeRepository.search(param);
    }

    @Transactional
    public List<PaperSize> getPaperSizesByCompanyId(Long companyId){
        return paperSizeRepository.findByCompanyId(companyId);
    }
}
