package com.example.vfprint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.vfprint.service.PaperSizeService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.vfprint.dto.PaperSizeDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/paper-sizes")
public class PaperSizeController {

    @Autowired
    private PaperSizeService paperSizeService;


    @GetMapping
    public List<PaperSizeDTO> getAllPaperSizes(@RequestParam("paperId") Long paperId){
        return paperSizeService.getPaperSizesByPaperId(null);
    }

    @GetMapping("/{paperId}")
    public List<PaperSizeDTO> getPaperSizesByPaperId(@PathVariable Long paperId) {
        return paperSizeService.getPaperSizesByPaperId(paperId);
    }
    

    @PostMapping()
    public ResponseEntity<String> createPaperSize(@RequestBody List<PaperSizeDTO> paperSize) {
        paperSizeService.createPaperSize(paperSize);
        return ResponseEntity.ok("Paper size created successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePaperSize(@PathVariable Long id, @RequestParam("paperId") Long paperId) {
        paperSizeService.deletePaperSize(id, paperId);;
        return ResponseEntity.ok("Paper size deleted successfully");
    }

    
    
    
}
