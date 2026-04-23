package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    
    @Autowired
    private PaperService paperService;

    @Autowired
    private PaperSizeService paperSizeService;

    @Autowired
    private PaperPriceService paperPriceService;


    // Ham tinh gia in an theo kich thuoc san pham va loai giay


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


        // Tinh dien tich san pham va to giay
        double areaProduct = widthProduct * heightProduct;
        double areaPaper = widthPaper * heightPaper;

        // Tinh so luong san pham / to giay can thiet
        int sheetsNeeded = (int) Math.ceil(areaPaper / areaProduct);
        return (int) Math.ceil((double) quantity / sheetsNeeded);
    }


    public static void main(String[] args) {
        CalculatorService calculatorService = new CalculatorService();
        int widthProduct = 10; // Kich thuoc san pham
        int heightProduct = 20;
        int widthPaper = 320; // Kich thuoc to giay
        int heightPaper = 0;
        int quantity = 5000; // So luong san pham

        int sheetsNeeded = calculatorService.calculatePaperSheets(widthProduct, heightProduct, widthPaper, heightPaper, quantity);
        System.out.println("So luong to giay can thiet: " + sheetsNeeded);
    }
}
