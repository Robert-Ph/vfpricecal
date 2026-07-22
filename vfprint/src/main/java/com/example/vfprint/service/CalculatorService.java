package com.example.vfprint.service;


import org.springframework.stereotype.Service;
import com.example.vfprint.dto.InfoPriceDTO;
import com.example.vfprint.dto.PaperSizeDTO;
import com.example.vfprint.dto.request.CalculateRequest;
import com.example.vfprint.dto.response.CalculateResponse;
import com.example.vfprint.entity.Discount;
import com.example.vfprint.entity.DiscountRange;
import com.example.vfprint.entity.PrintPrice;
import com.example.vfprint.entity.PrintPriceRange;
import com.example.vfprint.entity.Processing;
import com.example.vfprint.entity.Profit;
import com.example.vfprint.entity.ProfitItem;
import com.example.vfprint.enums.Priority;
import com.example.vfprint.repository.DiscountRangeRepository;
import com.example.vfprint.repository.DiscountRepository;
import com.example.vfprint.repository.PrintPriceRangeRepository;
import com.example.vfprint.repository.PrintPriceRepository;
import com.example.vfprint.repository.ProcessingRepository;
import com.example.vfprint.repository.ProcessingTierRepository;
import com.example.vfprint.repository.ProfitItemRepository;
import com.example.vfprint.repository.ProfitRepository;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.entity.ProcessingTier;
import java.util.Comparator;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class CalculatorService {

    private final PaperSizeService paperSizeService;

    private final ProcessingRepository processingRepository;

    private final ProfitRepository profitRepository;

    private final DiscountRangeRepository discountRangeRepository;

    private final PrintPriceRangeRepository printPriceRangeRepository;

    private final DiscountRepository discountRepository;

    private final ProfitItemRepository profitItemRepository;

    private final ProcessingTierRepository processingTierRepository;

    private final PrintPriceRepository priceRepository;



    // Ham tinh gia in an theo kich thuoc san pham va loai giay
    public CalculateResponse calculatePrintingCost(InfoPriceDTO infoPriceDTO) {

        // Kiem tra xem paper size va paper co ton tai hay khong
        PaperSizeDTO paperSizeDTO = selectOptimalPaperSize(infoPriceDTO.getWidthProduct(), infoPriceDTO.getHeightProduct(), infoPriceDTO.getQuantity(), infoPriceDTO.getPaperId());
        if (paperSizeDTO == null) {
            throw new RuntimeException("Paper size không tồn tại với ID: " + infoPriceDTO.getPaperId());
        }

        Profit profit = profitRepository.findById(infoPriceDTO.getProfit()).orElseThrow();
        

        
        if (infoPriceDTO.getProfit() == null ){
            profit = profitRepository.findByPriority(Priority.HIGH);
        }

        List<ProfitItem> profitItems = profitItemRepository.findByProfit(profit);
        double profitMaterial = 0;
        double profitPrint = 0;
        double profitProcessing = 0;

        for(ProfitItem item: profitItems){
            if (item.getName().equals("Giấy in")) {
                profitMaterial = item.getPercent();
            }
            if (item.getName().equals("Gia công")) {
                profitProcessing = item.getPercent();
            }
            if (item.getName().equals("In ấn")) {
                profitPrint = item.getPercent();
            }

        }
                // Tinh so luong to giay can thiet de in an san pham
        int sheetsNeeded = calculatePaperSheets(infoPriceDTO.getWidthProduct() + 3, infoPriceDTO.getHeightProduct() + 3,
                paperSizeDTO.getWidth() - 10, paperSizeDTO.getHeight() - 10, infoPriceDTO.getQuantity());

        //Giá giấy
        double materialPrice = (sheetsNeeded * paperSizeDTO.getPrice()) ;
        
    

        
        // Giá in ấn
        double prinPrice = sheetsNeeded * getPrintPrice(infoPriceDTO.getPrintPrice(), paperSizeDTO.getWidth(), paperSizeDTO.getHeight(), sheetsNeeded);

        // Giá gia công
        double totalProcessingCost = calculateTotalProcessingCost(infoPriceDTO.getProcessingIds(), sheetsNeeded, paperSizeDTO.getWidth(), paperSizeDTO.getHeight());

        //Kết quả báo giá in ấn
        double price = (materialPrice  * (100 + profitMaterial)/100 ) + (prinPrice * (100 + profitPrint)/100) + (totalProcessingCost * (100 + profitProcessing)/100);
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
                .productSheet(infoPriceDTO.getQuantity()/sheetsNeeded)
                .paperSize(paperSizeDTO.getWidth() + " x " + paperSizeDTO.getHeight())
                .processingCost(totalProcessingCost)
                .discount(price - (price*(1-discount/100)))
                .paperCost(price / sheetsNeeded)
                .cost(materialPrice + prinPrice + totalProcessingCost)
                .build();
    }


    // Ham tinh so luong to giay can thiet de in an san pham
    // Hàm tính số lượng tờ giấy cần thiết để in
    public int calculatePaperSheets(
        int widthProduct,
        int heightProduct,
        int widthPaper,
        int heightPaper,
        int quantity) {

        // Kiểm tra dữ liệu đầu vào
        if (widthProduct <= 0 || heightProduct <= 0
            || widthPaper <= 0 || heightPaper <= 0) {

        throw new IllegalArgumentException(
                "Kích thước sản phẩm và tờ giấy phải lớn hơn 0");
        }

        if (quantity <= 0) {
            throw new IllegalArgumentException(
                "Số lượng sản phẩm phải lớn hơn 0");
        }

        // Kiểm tra xem sản phẩm có đặt vừa giấy theo bất kỳ chiều nào không
        boolean fitNormal =
            widthProduct <= widthPaper
            && heightProduct <= heightPaper;

        boolean fitRotated =
            heightProduct <= widthPaper
            && widthProduct <= heightPaper;

        if (!fitNormal && !fitRotated) {
        throw new IllegalArgumentException(
                "Kích thước sản phẩm vượt quá kích thước tờ giấy");
        }

        // Tính số sản phẩm tối đa trên 1 tờ
        int productsPerSheet = calculateProductsPerSheet(
            widthProduct,
            heightProduct,
            widthPaper,
            heightPaper);

        if (productsPerSheet == 0) {
            throw new IllegalArgumentException(
                "Không thể sắp xếp sản phẩm trên tờ giấy");
        }

        // Tính số tờ cần dùng
        return (int) Math.ceil(
            (double) quantity / productsPerSheet);
    }


    //ham lua chon khổ giấy tối ưu nhất trong danh sách khổ giấy có sẵn dựa trên kích thước sản phẩm và số lượng sản phẩm cần in
    public PaperSizeDTO selectOptimalPaperSize(
        int widthProduct,
        int heightProduct,
        int quantity,
        UUID paperId) {

        List<PaperSizeDTO> paperSizes =
            paperSizeService.getPaperSizesByPaperId(paperId);

        PaperSizeDTO optimalPaperSize = null;
        int minSheetsNeeded = Integer.MAX_VALUE;

        for (PaperSizeDTO paperSize : paperSizes) {
        try {
            int sheetsNeeded = calculatePaperSheets(
                    widthProduct,
                    heightProduct,
                    paperSize.getWidth(),
                    paperSize.getHeight(),
                    quantity);

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
    public double calculateTotalProcessingCost(List<CalculateRequest> processingIds, int amount, double w, double h) {
        double totalCost = 0.0;
        if (processingIds.isEmpty()) {
            return totalCost;
        }
        for (CalculateRequest processingId : processingIds) {
            List<Processing> processingList = processingRepository.findByCategoryIdAndName(processingId.getId(), processingId.getName());
            for (Processing item : processingList){
                List<ProcessingTier> listTier = processingTierRepository.findByProcessing(item);

                    switch (item.getUnit()) {
                    case "m2":
                        double area = w * h * amount;
                        for(ProcessingTier tier: listTier){
                            if (area <= tier.getMaxVolume() || tier.getMaxVolume() == -1) {
                                if ((tier.getPrice()*amount) <= tier.getMinCharge()) {
                                    totalCost += tier.getMinCharge();
                                }else{
                                    totalCost += tier.getPrice()*amount;
                                }
                                break;
                            }
                            
                        }
                        break;
                
                    default:
                        for(ProcessingTier tier: listTier){
                            if (amount <= tier.getMaxVolume() || tier.getMaxVolume() == -1) {
                                if ((tier.getPrice()*amount) <= tier.getMinCharge()) {
                                    totalCost += tier.getMinCharge();
                                }else{
                                    totalCost += tier.getPrice()*amount;
                                }
                                break;
                            }
                        }
                        break;
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

    public double getPrintPrice(UUID id, int width, int height, int amount){

        PrintPrice price = priceRepository.findById(id).orElseThrow();
        List<PrintPriceRange> pRanges = printPriceRangeRepository.findByPrintPriceId(id);
        if(pRanges.size() == 1){
           return pRanges.get(0).getPricePerMeter();
        }else{
            switch (price.getUnit()) {
                case "m2":
                    double area = width * height * amount;
                    for(PrintPriceRange print: pRanges){
                        if (area <= print.getMaxLengthCm()) {
                            return print.getPricePerMeter();
                        }
                    }
                    break;
            
                case "size":
                    for(PrintPriceRange print: pRanges){
                        if (height <= print.getMaxLengthCm() && width <= print.getMinLengthCm()) {
                            return print.getPricePerMeter();
                        }
                    }
                    break;
                default:
                    for(PrintPriceRange print: pRanges){
                        if (height <= print.getMaxLengthCm()) {
                            return print.getPricePerMeter();
                        }
                    }
                    break;
            }
            
        }
    
        return 0;
    }

    // Tính số sản phẩm tối đa trên 1 tờ giấy
    public int calculateProductsPerSheet(
        int widthProduct,
        int heightProduct,
        int widthPaper,
        int heightPaper) {

        // Không xoay sản phẩm
        int normal =
            (widthPaper / widthProduct)
            * (heightPaper / heightProduct);

        // Xoay sản phẩm 90 độ
        int rotated =
            (widthPaper / heightProduct)
            * (heightPaper / widthProduct);

        return Math.max(normal, rotated);
    }

    // // hàm kiểm tra xem có sử dụng gia công bế không. nếu có trả về true. mục đích tràn viền tem nếu có gia công bế
    // public boolean isProcessingCutting(List<CalculateRequest> processingIds){
    //     for(CalculateRequest request: processingIds){
    //         Category category = categoryRepository.findById(request.getId()).orElseThrow();
    //         if ("Bế tem".equals(category.getName())) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

}
