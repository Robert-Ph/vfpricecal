package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.dto.InfoPriceDTO;
import com.example.vfprint.dto.PaperSizeDTO;
import com.example.vfprint.dto.request.CalculateRequest;
import com.example.vfprint.dto.response.CalculateResponse;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.repository.DiscountRepository;
import com.example.vfprint.repository.PrintPriceRepository;
import com.example.vfprint.repository.ProcessingRepository;
import com.example.vfprint.repository.ProfitRepository;

import java.util.List;
@Service
public class CalculatorService {
    
    
    @Autowired
    private PaperService paperService;

    @Autowired
    private PaperSizeService paperSizeService;

    @Autowired
    private ProcessingRepository processingRepository;

    @Autowired
    private ProfitRepository profitRepository;

    @Autowired
    private PrintPriceRepository priceRepository;

    @Autowired
    private DiscountRepository discountRepository;


    // Ham tinh gia in an theo kich thuoc san pham va loai giay
    public CalculateResponse calculatePrintingCost(InfoPriceDTO infoPriceDTO) {

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
        
        float prinPrice = 0;
        if(priceRepository.existsById(infoPriceDTO.getPrintPrice())){
            prinPrice = priceRepository.findById(infoPriceDTO.getPrintPrice()).get().getPrice();
        }
        double totalProcessingCost = calculateTotalProcessingCost(infoPriceDTO.getProcessingIds());
        float percentage = 1;
        if (profitRepository.existsById(infoPriceDTO.getProfit())) {
            percentage = profitRepository.findById(infoPriceDTO.getProfit()).get().getPercentage() / 100;
        }

        //Lấy chiết khấu cho khách hàng
        double discount = getDiscount(infoPriceDTO.getDiscount());

        //Kết quả báo giá in ấn
        double price = ((sheetsNeeded * (paperSizeDTO.getPrice()+ prinPrice + totalProcessingCost)) * percentage) * discount;

                // Tinh tong chi phi in an
        return CalculateResponse.builder()
                .price(Math.round(price))
                .quantityPaper(sheetsNeeded)
                .productSheet(calculateProductsPerSheet(infoPriceDTO.getWidthProduct(), infoPriceDTO.getHeightProduct(), paperSizeDTO.getWidth(), paperSizeDTO.getHeight(), true))
                .build();
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
        int sheetsNeeded = calculateProductsPerSheet(widthProduct, heightProduct, widthPaper, heightPaper, true);
        return (int) Math.ceil((double) quantity / sheetsNeeded);
    }

    //ham tinh kiemr tra processing tong tien cua processingIds:
    // Neu processingIds rong thi tra ve 0, neu processingId khong ton tai thi bo qua processing do,
    //  neu processingId ton tai thi cong gia processing do vao tong tien  
    public double calculateTotalProcessingCost(List<CalculateRequest> processingIds) {
        double totalCost = 0.0;
        if (processingIds.isEmpty()) {
            return totalCost;
        }
        for (CalculateRequest processingId : processingIds) {
            List<Processing> processingList = processingRepository.findByCategoryId(processingId.getId());
            for (Processing item : processingList){
                if ((item.getName()).equals(processingId.getName())) {
                    totalCost += item.getPrice();
                }
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

    //Lấy thông tin chiết khấu
    public double getDiscount(Long id){
        if (discountRepository.existsById(id)) {
            return (100 - discountRepository.findById(id).get().getDiscount())/100;
        }
        return 1;
    }

}
