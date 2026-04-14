package com.example.vfprint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.service.PaperSizeService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.vfprint.entity.PaperSize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/paper-sizes")
public class PaperSizeController {

    @Autowired
    private PaperSizeService paperSizeService;


    @GetMapping
    public List<PaperSize> getAllPaperSizes() {
        return paperSizeService.getAllPaperSizes();
    }

    @GetMapping("/{companyId}")
    public List<PaperSize> getPaperSizesByCompanyId(@PathVariable Long companyId) {
        return paperSizeService.getPaperSizesByCompanyId(companyId);
    }
    

    @GetMapping("/search")
    public List<PaperSize> searchPaperSizes(@RequestParam("param") String param) {
        return paperSizeService.searchPaperSizes(param);
    }

    @PostMapping()
    public PaperSize createPaperSize(@RequestBody PaperSize paperSize) {
        return paperSizeService.createPaperSize(paperSize);
    }

    @DeleteMapping("{id}")
    public String deletePaperSize(@RequestParam Long id) {
        paperSizeService.deletePaperSize(id);
        return "Paper size deleted Ok";
    }
    
    
    
}
