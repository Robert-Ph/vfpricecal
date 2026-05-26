package com.example.vfprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.vfprint.service.PaperService;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.dto.request.PaperRequest;
import com.example.vfprint.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.UUID;

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
    public ResponseEntity<ApiResponse> getAllPapers(@RequestParam("companyId") UUID companyId){
        return ResponseEntity.ok(
            ApiResponse
            .builder()
            .code(200)
            .message("Papers retrieved successfully")
            .data(paperService.getAllPapersByCompany(companyId))
            .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPapersByCompanyId(@PathVariable UUID id) {
        return ResponseEntity.ok(
            ApiResponse
            .builder()
            .code(200)
            .message("Paper retrieved successfully")
            .data(paperService.getPaperById(id))
            .build()
        );
    }

    @PostMapping
    public  ResponseEntity<ApiResponse>  createPaper(@RequestBody PaperRequest paperRequest) {
        paperService.createPaperRequest(paperRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse
            .builder()
            .code(200)
            .message("Paper created successfully")
            .data(paperRequest)
            .build()
        );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePaper(@PathVariable UUID id,@RequestParam("companyId") UUID companyId) {
        paperService.deletePaper(id, companyId);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse
            .builder()
            .code(200)
            .message("Paper deleted successfully")
            .build()
        );
    }

}
