// package com.example.vfprint.controller;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import com.example.vfprint.service.PaperPriceService;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import com.example.vfprint.dto.PaperPriceDTO;


// @RestController
// @RequestMapping("/api/paper-prices")
// public class PaperPriceController {

//     @Autowired
//     private PaperPriceService paperPriceService;

//     @PostMapping
//    public ResponseEntity<String> createPaperPrice(@RequestBody PaperPriceDTO paperPrice) {
//         try {
//             paperPriceService.createPaperPrice(paperPrice);
//             return ResponseEntity.ok("Paper price created successfully");
//         } catch (RuntimeException e) {
//             return ResponseEntity.badRequest().body(e.getMessage());
//         }
//     }
    

// }
