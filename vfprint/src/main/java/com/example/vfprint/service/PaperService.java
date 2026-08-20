package com.example.vfprint.service;


import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.dto.PaperSizeDTO;
import com.example.vfprint.entity.Paper;
import com.example.vfprint.entity.PaperSize;
import com.example.vfprint.enums.ActionLog;
import com.example.vfprint.enums.LevelLog;
import com.example.vfprint.enums.StatusLog;
import com.example.vfprint.dto.request.PaperRequest;
import com.example.vfprint.dto.request.PaperSizeRequest;
import com.example.vfprint.dto.response.PaperResponse;
import com.example.vfprint.repository.PaperRepository;
import com.example.vfprint.repository.PaperSizeRepository;
import lombok.RequiredArgsConstructor;
import com.example.vfprint.repository.CompaniesRepository;
import com.example.vfprint.entity.Companies;

@Service
@RequiredArgsConstructor
public class PaperService {
    
    
    private final PaperRepository paperRepository;
    private final PaperSizeRepository paperSizeRepository;
    private final CompaniesRepository companyRepository;
    private final LogUserService logUserService;

    @Transactional
    public void createPaperRequest(PaperRequest paperRequest) {
        try {
            // 1. KIỂM TRA CÔNG TY CÓ TỒN TẠI KHÔNG
            // Nếu KHÔNG tồn tại (!) thì bắn lỗi ngay lập tức
            if (!companyRepository.existsById(paperRequest.getCompanyId())) {
                throw new IllegalArgumentException("Không tìm thấy công ty với ID: " + paperRequest.getCompanyId());
            }

            // 2. KIỂM TRA TRÙNG TÊN GIẤY (Nếu cần thiết cho nghiệp vụ)
            if (paperRepository.existsByNameAndCompanyId(paperRequest.getName(), paperRequest.getCompanyId())) {
                throw new IllegalArgumentException("Tên giấy này đã tồn tại trong hệ thống của công ty.");
            }

            // 3. NẾU MỌI THỨ OK -> TIẾN HÀNH LƯU
            // Lưu Paper
            Paper paper = Paper.builder()
                .company(Companies.builder().id(paperRequest.getCompanyId()).build())
                .name(paperRequest.getName())
                .gsm(paperRequest.getGsm())
                .isActive(true)
                .build();
            Paper savedPaper = paperRepository.save(paper);

            // Lưu PaperSize và PaperPrice... (giữ nguyên logic vòng lặp cũ của bạn)
            for (PaperSizeRequest sizeRequest : paperRequest.getPaperSizes()) {
                paperSizeRepository.save(PaperSize.builder()
                    .paper(savedPaper)
                    .width(sizeRequest.getWidth())
                    .height(sizeRequest.getHeight())
                    .price(sizeRequest.getPrice())
                    .isActive(true)
                    .build());
            }
            // =========================================================
            // Ghi log tạo thành công
            // =========================================================
            logUserService.createLogUser(
                paperRequest != null ? paperRequest.getCompanyId() : null,
                LevelLog.INFO,
                ActionLog.CREATE,
                paperRequest !=null ? paperRequest.getAccountId() : null,
                "Tạo vật liệu mới: " + paperRequest.getName(),
                StatusLog.Success
            );
        } catch (Exception e) {
            // =========================================================
            // Ghi log lỗi
            // =========================================================
            logUserService.createLogUser(
                paperRequest != null ? paperRequest.getCompanyId() : null,
                LevelLog.INFO,
                ActionLog.CREATE,
                paperRequest !=null ? paperRequest.getAccountId() : null,
                "Tạo vật liệu mới: " + paperRequest.getName(),
                StatusLog.Failed
            );

            throw e;
        }
        
    }

    @Transactional
    public void createPaper(PaperDTO paperDTO) {
        if (paperRepository.existsByNameAndCompanyId(paperDTO.getName(), paperDTO.getCompanyId())) {
            throw new IllegalArgumentException("Paper with the same name and company already exists");
        }
        Paper paper = Paper.builder()
                .company(Companies.builder().id(paperDTO.getCompanyId()).build())
                .name(paperDTO.getName())
                .gsm(paperDTO.getGsm())
                .isActive(true)
                .build();
        paperRepository.save(paper);
    }   

    @Transactional
    public void deletePaper(UUID paperId, UUID companyId, UUID accountId) {
        try {
            Paper paper = paperRepository
            .findByIdAndCompanyId(paperId, companyId)
            .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Paper not found with id: " + paperId
                    )
            );

            // Xóa paper size trước
            paperSizeRepository.deleteByPaperId(paperId);

            // Xóa paper
            paperRepository.delete(paper);

            // =========================================================
            // Ghi log xoá thành công
            // =========================================================
            logUserService.createLogUser(
                companyId,
                LevelLog.INFO,
                ActionLog.DELETE,
                accountId,
                "Xoá vật liệu: " + paper.getName(),
                StatusLog.Success
            );
        } catch (Exception e) {
            // =========================================================
            // Ghi log xoá thành công
            // =========================================================
            logUserService.createLogUser(
                companyId,
                LevelLog.INFO,
                ActionLog.DELETE,
                accountId,
                "Xoá vật liệu",
                StatusLog.Failed
            );

            throw e;
        }

        
    }

    @Transactional
    public List<PaperResponse> getPapersByCompanyId(Long companyId) {
        List<Paper> papers = paperRepository.findAll().stream()
                .filter(paper -> paper.getCompany().getId().equals(companyId))
                .toList();
        return papers.stream()
                .map(paper -> {
                    return PaperResponse.builder()
                            .id(paper.getId())
                            .companyId(paper.getCompany().getId())
                            .name(paper.getName())
                            .gsm(paper.getGsm())
                            .build();
                })
                .toList();
    }

    @Transactional
    public PaperDTO getPaperById(UUID paperId) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new IllegalArgumentException("Paper not found with id: " + paperId));
        // Lấy danh sách Size kèm theo Price của từng Sizey
        List<PaperSize> sizes = paperSizeRepository.findByPaperId(paper.getId());
  
        
       return PaperDTO.builder()
                        .id(paper.getId())
                        .name(paper.getName())
                        .gsm(paper.getGsm())
                        .paperSizes(sizes.stream()
                                .map(size -> {
                                    PaperSizeDTO sizeDTO = new PaperSizeDTO();
                                    sizeDTO.setId(size.getId());
                                    sizeDTO.setPaperId(size.getPaper().getId());
                                    sizeDTO.setWidth(size.getWidth());
                                    sizeDTO.setHeight(size.getHeight());
                                    sizeDTO.setPrice(size.getPrice());
                                    return sizeDTO;
                                })
                                .toList())
                        .build();
    }

    @Transactional
    public List<PaperResponse> getAllPapersByCompany(UUID companyId) {
        return paperRepository.findAll().stream()
                .filter(paper -> paper.getCompany().getId().equals(companyId))
                .map(paper -> {
                    return PaperResponse.builder()
                            .id(paper.getId())
                            .companyId(paper.getCompany().getId())
                            .name(paper.getName())
                            .gsm(paper.getGsm())
                            .build();
                })
                .toList();
    }
}
