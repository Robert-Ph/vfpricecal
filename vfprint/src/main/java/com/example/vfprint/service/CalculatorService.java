package com.example.vfprint.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.dto.InfoPriceDTO;
import com.example.vfprint.dto.PaperSizeDTO;
import com.example.vfprint.dto.request.CalculateRequest;
import com.example.vfprint.dto.response.CalculateResponse;
import com.example.vfprint.entity.Discount;
import com.example.vfprint.entity.DiscountRange;
import com.example.vfprint.entity.PrintPriceRange;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.enums.Priority;
import com.example.vfprint.repository.DiscountRangeRepository;
import com.example.vfprint.repository.DiscountRepository;
import com.example.vfprint.repository.PrintPriceRangeRepository;
import com.example.vfprint.repository.ProcessingRepository;
import com.example.vfprint.repository.ProfitRepository;
import java.util.Comparator;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
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
    private DiscountRangeRepository discountRangeRepository;

    @Autowired
    private PrintPriceRangeRepository printPriceRangeRepository;

    @Autowired
    private DiscountRepository discountRepository;


    // Ham tinh gia in an theo kich thuoc san pham va loai giay
    public CalculateResponse calculatePrintingCost(InfoPriceDTO infoPriceDTO) {

        // Kiem tra xem paper size va paper co ton tai hay khong
        PaperSizeDTO paperSizeDTO = selectOptimalPaperSize(infoPriceDTO.getWidthProduct(), infoPriceDTO.getHeightProduct(), infoPriceDTO.getQuantity(), infoPriceDTO.getPaperId());
        if (paperSizeDTO == null) {
            throw new RuntimeException("Paper size không tồn tại với ID: " + infoPriceDTO.getPaperId());
        }

        // Kiem tra xem paper co ton tai hay khong
        PaperDTO paper = paperService.getPaperById(infoPriceDTO.getPaperId());
        if (paper == null) {
            throw new RuntimeException("Paper không tồn tại với ID: " + infoPriceDTO.getPaperId());
        }

    
        // Tinh so luong to giay can thiet de in an san pham
        int sheetsNeeded = calculatePaperSheets(infoPriceDTO.getWidthProduct() + 3, infoPriceDTO.getHeightProduct() + 3,
                paperSizeDTO.getWidth() - 10, paperSizeDTO.getHeight() - 10, infoPriceDTO.getQuantity());
        
        double prinPrice = getPrintPrice(infoPriceDTO.getPrintPrice(), paperSizeDTO.getHeight());

        double totalProcessingCost = calculateTotalProcessingCost(infoPriceDTO.getProcessingIds());

        float percentage = 1;

        if (infoPriceDTO.getProfit() != null &&
            profitRepository.existsById(infoPriceDTO.getProfit())) {

            percentage = profitRepository.findById(infoPriceDTO.getProfit())
                .get()
                .getPercentage() / 100;
        }else{
            List<Profit> profits = profitRepository.findByPriority(Priority.HIGH);
            System.out.println(profits.size());
            percentage=profits.get(0).getPercentage()/100;
        }

        System.out.println(percentage);


        //Kết quả báo giá in ấn
        double price = ((sheetsNeeded * (paperSizeDTO.getPrice() + prinPrice + totalProcessingCost)) * percentage);
        UUID discountId = null;
        if (infoPriceDTO.getDiscount() == null) {
            List<Discount> dList = discountRepository.findByPriority(Priority.HIGH);
            System.out.println(dList.size());
            discountId = dList.get(0).getId();
        }else{
            discountId = infoPriceDTO.getDiscount();
        }
        //Lấy chiết khấu cho khách hàng
        double discount = getDiscount(discountId, BigDecimal.valueOf(price));

        System.out.println(price);
       
                // Tinh tong chi phi in an
        return CalculateResponse.builder()
                .price(Math.round(price))
                .quantityPaper(sheetsNeeded)
                .productSheet(calculateProductsPerSheet(infoPriceDTO.getWidthProduct() + 3, infoPriceDTO.getHeightProduct() + 3, paperSizeDTO.getWidth() - 10, paperSizeDTO.getHeight() - 10, true))
                .paperSize(paperSizeDTO.getWidth() + " x " + paperSizeDTO.getHeight())
                .processingCost(totalProcessingCost * sheetsNeeded)
                .discount(price - (price*(1-discount/100)))
                .paperCost(price / sheetsNeeded)
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


    //ham lua chon khổ giấy tối ưu nhất trong danh sách khổ giấy có sẵn dựa trên kích thước sản phẩm và số lượng sản phẩm cần in
    public PaperSizeDTO selectOptimalPaperSize(int widthProduct, int heightProduct, int quantity, UUID paperId) {
        List<PaperSizeDTO> paperSizes = paperSizeService.getPaperSizesByPaperId(paperId);
        PaperSizeDTO optimalPaperSize = null;
        int minSheetsNeeded = Integer.MAX_VALUE;

        for (PaperSizeDTO paperSize : paperSizes) {
            try {
                int sheetsNeeded = calculatePaperSheets(widthProduct, heightProduct, paperSize.getWidth(), paperSize.getHeight(), quantity);
                if (sheetsNeeded < minSheetsNeeded) {
                    minSheetsNeeded = sheetsNeeded;
                    optimalPaperSize = paperSize;
                }
            } catch (IllegalArgumentException e) {
                // Bỏ qua các khổ giấy không phù hợp
            }
        }

        return optimalPaperSize;
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

    public int getDiscount(UUID id, BigDecimal amount) {

        List<DiscountRange> discountRange =
            discountRangeRepository.findByDiscountId(id);

        if (discountRange.isEmpty()) {
            return 100;
        }

        discountRange.sort(
            Comparator.comparing(DiscountRange::getMaxAmount)
        );

        for (DiscountRange d : discountRange) {
            if (amount.compareTo(d.getMaxAmount()) <= 0) {
                return (int) d.getDiscount();
            }
        }

        // Không có mức nào phù hợp => lấy mức chiết khấu lớn nhất
        return (int) discountRange.get(discountRange.size() - 1)
            .getDiscount();
    }

    public double getPrintPrice(UUID id, int height ){
        double result = 0;

        List<PrintPriceRange> pRanges = printPriceRangeRepository.findByPrintPriceId(id);
        if(pRanges.size() == 1){
           result = pRanges.get(0).getPricePerMeter();
        }else{
            for(PrintPriceRange print: pRanges){
                if (height <= print.getMaxLengthCm()) {
                    result = print.getPricePerMeter();
                }
            }
        }
    
        return result;
    }

}
