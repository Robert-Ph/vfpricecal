package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.dto.PaperPriceDTO;
import com.example.vfprint.dto.InfoPriceDTO;
import com.example.vfprint.dto.PaperSizeDTO;
import com.example.vfprint.entity.Paper;
import com.example.vfprint.entity.PaperPrice;
import com.example.vfprint.entity.PaperSize;
import com.example.vfprint.repository.PaperPriceRepository;
import com.example.vfprint.repository.PaperSizeRepository;

@Service
public class CalculatorService {
    
    
    @Autowired
    private PaperService paperService;

    @Autowired
    private PaperSizeService paperSizeService;

    @Autowired
    private PaperPriceService paperPriceService;

    @Autowired
    private PaperSizeRepository paperSizeRepository;

    @Autowired
    private PaperPriceRepository paperPriceRepository;

    @Autowired
    private PaperPrice paperPrice;


    // Ham tinh gia in an theo kich thuoc san pham va loai giay
    public double calculatePrintingCost(InfoPriceDTO infoPriceDTO) {
        PaperSizeDTO paperSizeDTO = paperSizeService.getPaperSizeById(infoPriceDTO.getPaperSizeId());
        if (paperSizeDTO == null) {
            throw new RuntimeException("Paper size không tồn tại với ID: " + infoPriceDTO.getPaperSizeId());
        }
        PaperDTO paper = paperService.getPaperById(infoPriceDTO.getPaperId(), infoPriceDTO.getCompanyId());
        if (paper == null) {
            throw new RuntimeException("Paper không tồn tại với ID: " + infoPriceDTO.getPaperId());
        }

        PaperPrice pricePerSheet = paperPriceService.getPaperPriceDTO(infoPriceDTO.getPaperSizeId());
        if (pricePerSheet == null) {
            throw new RuntimeException("Paper price không tồn tại cho PaperSize ID: " + infoPriceDTO.getPaperSizeId());
        }

        int sheetsNeeded = calculatePaperSheets(infoPriceDTO.getWidthProduct(), infoPriceDTO.getHeightProduct(),
                paperSizeDTO.getWidth(), paperSizeDTO.getHeight(), infoPriceDTO.getQuantity());
        
        return sheetsNeeded * pricePerSheet.getPrice();


    }


    // Ham tinh so luong to giay can thiet de in an san pham
    public int calculatePaperSheets(int widthProduct, int heightProduct, int widthPaper, int heightPaper, int quantity ) {
        // Kiem tra kich thuoc san pham va to giay
        if (widthProduct <= 0 || heightProduct <= 0 || widthPaper <= 0 || heightPaper <= 0) {
            throw new IllegalArgumentException("Kich thuoc san pham va to giay phai lon hon 0");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("So luong san pham phai lon hon 0");
            
        }

        // Kiem tra xem san pham co the in tren to giay hay khong
        if (widthProduct > widthPaper || heightProduct > heightPaper) {
            throw new IllegalArgumentException("Kich thuoc san pham vuot qua kich thuoc to giay");
        }

        // Tinh so luong san pham / to giay can thiet
        int sheetsNeeded = calculateProductsPerSheet(widthProduct, heightProduct, widthPaper, heightPaper, false);
        return (int) Math.ceil((double) quantity / sheetsNeeded);
    }


    public int calculateProductsPerSheet(int widthProduct, int heightProduct, int widthPaper, int heightPaper, boolean cutting) {
        if (cutting) {
            widthPaper += 2;
            heightPaper += 2;
        }

        widthPaper -= 10; // Tru di 10mm de dam bao khoang cach an toan
        heightPaper -= 10;

        int totalProductsPerSheetbyWidth = (widthPaper / widthProduct) * (heightPaper / heightProduct);
        int totalProductsPerSheetbyHeight = (heightPaper / widthProduct) * (widthPaper / heightProduct);
        
        if (totalProductsPerSheetbyWidth > totalProductsPerSheetbyHeight) {
            return totalProductsPerSheetbyWidth;
        }

        return totalProductsPerSheetbyHeight;
    }


    public static void main(String[] args) {
        CalculatorService calculatorService = new CalculatorService();
        int widthProduct = 290; // Kich thuoc san pham
        int heightProduct = 100;
        int widthPaper = 300; // Kich thuoc to giay
        int heightPaper = 400;
        int quantity = 10; // So luong san pham

        int sheetsNeeded = calculatorService.calculatePaperSheets(widthProduct, heightProduct, widthPaper, heightPaper, quantity);
        System.out.println("So luong to giay can thiet: " + sheetsNeeded);
        System.out.println("So san pham tren moi to giay: " + calculatorService.calculateProductsPerSheet(widthProduct, heightProduct, widthPaper, heightPaper, false));
    }
}
