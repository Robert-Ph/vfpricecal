package com.example.vfprint.controller;

import com.example.vfprint.service.DiscountRangeService;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfprint.dto.request.DiscountRangeRequest;
import com.example.vfprint.dto.request.DiscountRequest;
import com.example.vfprint.dto.response.ApiResponse;
import com.example.vfprint.service.DiscountService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/discount")
public class DiscountController {
    
    private final DiscountRangeService discountRangeService;
    @Autowired
    private DiscountService discountService;

    DiscountController(DiscountRangeService discountRangeService) {
        this.discountRangeService = discountRangeService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createDiscountByCompany(@RequestBody DiscountRequest discountDTO){
            discountService.createDiscountByCompany(discountDTO);
            return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.builder()
                .code(200)
                .message(" create discount successfully")
                .data(discountDTO)
                .build()
            );
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllDiscountByCompany(@RequestParam UUID companyId){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Get all discount by company successfully")
            .data(discountService.getAllDiscountByCompany(companyId))
            .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getDiscountDetailByDiscountId(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Get successfully")
            .data(discountService.getDiscountRangeByDiscountId(id))
            .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDiscount(@PathVariable UUID id, @RequestParam("companyId") UUID companyId){
        discountService.deleteDiscount(id, companyId);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Delete discount successfully")
            .build()
        );
    }
    
    @PostMapping("/create-range")
    public ResponseEntity<ApiResponse> createDiscountRange(@RequestBody DiscountRangeRequest request){
        discountRangeService.createDiscountRangeByDiscountId(request);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Create discount range successfully")
            .build()
        );
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateDiscountById( @RequestBody DiscountRangeRequest request) {
        discountRangeService.updateDiscountRangeById(request);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Update Successfully")
            .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteDiscountRangeById(@PathVariable UUID id){
        discountRangeService.deleteDiscountById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
            ApiResponse.builder()
            .code(200)
            .message("Delete successfully")
            .build()
        );
    }
}
