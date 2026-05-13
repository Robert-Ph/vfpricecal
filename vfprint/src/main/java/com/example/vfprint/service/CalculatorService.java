package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.dto.InfoPriceDTO;
import com.example.vfprint.dto.PaperSizeDTO;
import java.util.List;
@Service
public class CalculatorService {
    
    
    @Autowired
    private PaperService paperService;

    @Autowired
    private PaperSizeService paperSizeService;


    @Autowired
    private ProcessingService processingService;


    // Ham tinh gia in an theo kich thuoc san pham va loai giay
    public double calculatePrintingCost(InfoPriceDTO infoPriceDTO) {

        // Kiem tra xem paper size va paper co ton tai hay khong
        PaperSizeDTO paperSizeDTO = paperSizeService.getPaperSizeById(infoPriceDTO.getPaperSizeId());
        if (paperSizeDTO == null) {
            throw new RuntimeException("Paper size không tồn tại với ID: " + infoPriceDTO.getPaperSizeId());
        }

        // Kiem tra xem paper co ton tai hay khong
        PaperDTO paper = paperService.getPaperById(infoPriceDTO.getPaperId());
        if (paper == null) {
            throw new RuntimeException("Paper không tồn tại với ID: " + infoPriceDTO.getPaperId());
        }

    
        // Tinh so luong to giay can thiet de in an san pham
        int sheetsNeeded = calculatePaperSheets(infoPriceDTO.getWidthProduct(), infoPriceDTO.getHeightProduct(),
                paperSizeDTO.getWidth(), paperSizeDTO.getHeight(), infoPriceDTO.getQuantity());
        
        double totalProcessingCost = calculateTotalProcessingCost(infoPriceDTO.getProcessingIds());
                // Tinh tong chi phi in an
        return sheetsNeeded * (paperSizeDTO.getPrice() + totalProcessingCost);


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

    //ham tinh kiemr tra processing tong tien cua processingIds:
    // Neu processingIds rong thi tra ve 0, neu processingId khong ton tai thi bo qua processing do,
    //  neu processingId ton tai thi cong gia processing do vao tong tien  
    public double calculateTotalProcessingCost(List<Long> processingIds) {
        double totalCost = 0.0;
        if (processingIds.isEmpty()) {
            return totalCost;
        }
        for (Long processingId : processingIds) {
            if (processingService.getProcessingById(processingId) != null) {
                 totalCost += processingService.getProcessingById(processingId).getPrice();
            }   
        }
        return totalCost;
    }

    //tinh so luong san pham tren 1 to giay, co cat canh hay khong cat canh
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

}
