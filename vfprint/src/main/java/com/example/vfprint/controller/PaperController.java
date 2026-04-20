package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.vfprint.service.PaperService;
import com.example.vfprint.dto.PaperDTO;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/papers")
public class PaperController {
    
    @Autowired
    private PaperService paperService;

    @GetMapping
    public List<PaperDTO> getAllPapers(@RequestParam("companyId") Long companyId){
        return paperService.getAllPapersByCompany(companyId);
    }

    @GetMapping("{id}")
    public PaperDTO getPapersByCompanyId(@PathVariable Long id, @RequestParam("companyId") Long companyId) {
        return paperService.getPaperById(id, companyId);
    }

    @PostMapping
    public  ResponseEntity<String>  postMethodName(@RequestBody PaperDTO paperDTO) {
        paperService.createPaper(paperDTO);
        return ResponseEntity.ok("Paper created successfully");
    }
    
    @DeleteMapping
    public ResponseEntity<String> deletePaper(@RequestParam("paperId") Long paperId) {
        paperService.deletePaper(paperId);
        return ResponseEntity.ok("Paper deleted successfully");
    }

}
