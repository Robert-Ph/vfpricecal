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
import com.example.vfprint.enums.ActionLog;
import com.example.vfprint.enums.LevelLog;
import com.example.vfprint.enums.Priority;
import com.example.vfprint.enums.StatusLog;
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
import java.math.RoundingMode;
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

    private final LogUserService logUserService;





public CalculateResponse calculatePrintingCost(InfoPriceDTO infoPriceDTO) {

    try {
        // =========================================================
        // 1. Kiểm tra dữ liệu đầu vào
        // =========================================================
        if (infoPriceDTO == null) {
            throw new IllegalArgumentException("Thông tin báo giá không được null");
        }

        if (infoPriceDTO.getPaperId() == null) {
            throw new IllegalArgumentException("Paper ID không được null");
        }

        if (infoPriceDTO.getQuantity() <= 0) {
            throw new IllegalArgumentException("Số lượng sản phẩm phải lớn hơn 0");
        }

        // =========================================================
        // 2. Tìm khổ giấy phù hợp
        // =========================================================
        PaperSizeDTO paperSizeDTO = new PaperSizeDTO();
        if (infoPriceDTO.getPaperSizeId().equals("")) {
            paperSizeDTO = selectOptimalPaperSize(
                infoPriceDTO.getWidthProduct(),
                infoPriceDTO.getHeightProduct(),
                infoPriceDTO.getQuantity(),
                infoPriceDTO.getPaperId()
        );

        if (paperSizeDTO == null) {
            throw new RuntimeException(
                    "Không tìm thấy khổ giấy phù hợp với Paper ID: "
                            + infoPriceDTO.getPaperId()
            );
        }
        }else{
           paperSizeDTO = paperSizeService.getPaperSizeById(infoPriceDTO.getPaperSizeId());

        }
        

        // =========================================================
        // 3. Lấy Profit
        // =========================================================
        Profit profit;

        if (infoPriceDTO.getProfit() != null) {
            profit = profitRepository.findById(infoPriceDTO.getProfit())
                    .orElseThrow(() -> new RuntimeException(
                            "Không tìm thấy Profit với ID: "
                                    + infoPriceDTO.getProfit()
                    ));
        } else {
            profit = profitRepository.findByPriority(Priority.HIGH);

            if (profit == null) {
                throw new RuntimeException(
                        "Không tìm thấy Profit mặc định với Priority.HIGH"
                );
            }
        }

        // =========================================================
        // 4. Lấy phần trăm lợi nhuận
        // =========================================================
        BigDecimal profitMaterial = BigDecimal.ZERO;
        BigDecimal profitPrint = BigDecimal.ZERO;
        BigDecimal profitProcessing = BigDecimal.ZERO;

        List<ProfitItem> profitItems = profitItemRepository.findByProfit(profit);

        if (profitItems != null) {
            for (ProfitItem item : profitItems) {

                if (item == null || item.getName() == null) {
                    continue;
                }

                BigDecimal percent = BigDecimal.valueOf(item.getPercent());

                switch (item.getName()) {
                    case "Giấy in":
                        profitMaterial = percent;
                        break;

                    case "Gia công":
                        profitProcessing = percent;
                        break;

                    case "In ấn":
                        profitPrint = percent;
                        break;

                    default:
                        break;
                }
            }
        }

        // =========================================================
        // 5. Tính số lượng tờ giấy cần sử dụng
        // =========================================================
        System.out.println("số sản phẩm tren to:" + infoPriceDTO.getProductInPage() + "#########################################");
        int sheetsNeeded = 0;
        if (infoPriceDTO.getProductInPage() <=0) {
            int productWidth = infoPriceDTO.getWidthProduct() + 2;
            int productHeight = infoPriceDTO.getHeightProduct() + 2;

            int usablePaperWidth = paperSizeDTO.getWidth() - 10;
            int usablePaperHeight = paperSizeDTO.getHeight() - 10;

            if (usablePaperWidth <= 0 || usablePaperHeight <= 0) {
                throw new RuntimeException(
                    "Kích thước khổ giấy không hợp lệ: "
                            + paperSizeDTO.getWidth()
                            + " x "
                            + paperSizeDTO.getHeight()
                );
            }

            sheetsNeeded = calculatePaperSheets(
                productWidth,
                productHeight,
                usablePaperWidth,
                usablePaperHeight,
                infoPriceDTO.getQuantity()
            );
        }else{
            sheetsNeeded = infoPriceDTO.getQuantity()/infoPriceDTO.getProductInPage();
        }

        

        if (sheetsNeeded <= 0) {
            throw new RuntimeException(
                    "Số lượng tờ giấy cần thiết phải lớn hơn 0"
            );
        }

        // =========================================================
        // 6. Tính giá giấy
        // =========================================================
        BigDecimal sheets = BigDecimal.valueOf(sheetsNeeded);

        BigDecimal materialPrice = sheets
                .multiply(paperSizeDTO.getPrice());

        // =========================================================
        // 7. Tính giá in
        // =========================================================
        BigDecimal printUnitPrice = BigDecimal.valueOf(
                getPrintPrice(
                        infoPriceDTO.getPrintPrice(),
                        paperSizeDTO.getWidth(),
                        paperSizeDTO.getHeight(),
                        sheetsNeeded
                )
        );

        BigDecimal printPrice = sheets.multiply(printUnitPrice);

        // =========================================================
        // 8. Tính giá gia công
        // =========================================================
        BigDecimal processingCost = BigDecimal.valueOf(
                calculateTotalProcessingCost(
                        infoPriceDTO.getProcessingIds(),
                        sheetsNeeded,
                        paperSizeDTO.getWidth(),
                        paperSizeDTO.getHeight()
                )
        );

        // =========================================================
        // 9. Tính giá sau lợi nhuận
        // =========================================================
        BigDecimal hundred = BigDecimal.valueOf(100);

        BigDecimal materialPriceWithProfit = materialPrice
                .multiply(hundred.add(profitMaterial))
                .divide(hundred, 2, RoundingMode.HALF_UP);

        BigDecimal printPriceWithProfit = printPrice
                .multiply(hundred.add(profitPrint))
                .divide(hundred, 2, RoundingMode.HALF_UP);

        BigDecimal processingPriceWithProfit = processingCost
                .multiply(hundred.add(profitProcessing))
                .divide(hundred, 2, RoundingMode.HALF_UP);

        BigDecimal price = materialPriceWithProfit
                .add(printPriceWithProfit)
                .add(processingPriceWithProfit);

        // =========================================================
        // 10. Lấy Discount
        // =========================================================
        UUID discountId;

        if (infoPriceDTO.getDiscount() != null) {

            discountId = infoPriceDTO.getDiscount();

        } else {

            List<Discount> discountList =
                    discountRepository.findByPriority(Priority.HIGH);

            if (discountList == null || discountList.isEmpty()) {
                throw new RuntimeException(
                        "Không tìm thấy Discount mặc định"
                );
            }

            discountId = discountList.get(0).getId();
        }

        // =========================================================
        // 11. Tính chiết khấu
        // =========================================================
        double discountValue = getDiscount(discountId, price);

        BigDecimal discountPercent =
                BigDecimal.valueOf(discountValue);

        BigDecimal discountAmount = price
                .multiply(discountPercent)
                .divide(hundred, 2, RoundingMode.HALF_UP);

        // Giá sau khi giảm
        BigDecimal finalPrice = price.subtract(discountAmount);

        // =========================================================
        // 12. Tính giá giấy / tờ
        // =========================================================
        BigDecimal paperCost = price.divide(
                sheets,
                2,
                RoundingMode.HALF_UP
        );

        // =========================================================
        // 13. Tổng chi phí thực tế
        // =========================================================
        BigDecimal totalCost = materialPrice
                .add(printPrice)
                .add(processingCost);

        // =========================================================
        // 14. Ghi log thành công
        // =========================================================
        logUserService.createLogUser(
                infoPriceDTO.getCompanyId(),
                LevelLog.INFO,
                ActionLog.QUOTATION,
                infoPriceDTO.getAccoutId(),
                "Tính báo giá",
                StatusLog.Success
        );

        // =========================================================
        // 15. Tạo response
        // =========================================================
        CalculateResponse result = CalculateResponse.builder()
                // Giá trước chiết khấu
                .price(price)

                // Số tờ giấy cần dùng
                .quantityPaper(sheetsNeeded)

                // Số sản phẩm / tờ
                .productSheet(
                        infoPriceDTO.getQuantity() / sheetsNeeded
                )

                // Khổ giấy
                .paperSize(
                        paperSizeDTO.getWidth()
                                + " x "
                                + paperSizeDTO.getHeight()
                )

                // Chi phí gia công
                .processingCost(processingCost)

                // Số tiền được giảm
                .discount(discountAmount)

                // Giá / tờ
                .paperCost(paperCost)

                // Tổng chi phí thực tế
                .cost(totalCost)

                .build();

        return result;

    } catch (Exception e) {

        // =========================================================
        // Ghi log lỗi
        // =========================================================
        logUserService.createLogUser(
                infoPriceDTO != null ? infoPriceDTO.getCompanyId() : null,
                LevelLog.INFO,
                ActionLog.QUOTATION,
                infoPriceDTO != null ? infoPriceDTO.getAccoutId() : null,
                "Tính báo giá",
                StatusLog.Failed
        );

        throw e;
    }
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

}
