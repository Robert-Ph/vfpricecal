package com.example.vfprint.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.entity.Paper;
import com.example.vfprint.entity.PaperPrice;
import com.example.vfprint.entity.PaperSize;
import com.example.vfprint.dto.request.PaperRequest;
import com.example.vfprint.dto.request.PaperSizeRequest;
import com.example.vfprint.repository.PaperRepository;
import com.example.vfprint.repository.PaperSizeRepository;
import com.example.vfprint.repository.PaperPriceRepository;
import com.example.vfprint.repository.CompaniesRepository;

@Service
public class PaperService {
    
    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private PaperSizeRepository paperSizeRepository;

    @Autowired
    private PaperPriceRepository paperPriceRepository;

    @Autowired
    private CompaniesRepository companyRepository;



 @Transactional
    public void createPaperRequest(PaperRequest paperRequest) {
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
                .companyId(paperRequest.getCompanyId())
                .name(paperRequest.getName())
                .gsm(paperRequest.getGsm())
                .isActive(true)
                .build();
        Paper savedPaper = paperRepository.save(paper);

        // Lưu PaperSize và PaperPrice... (giữ nguyên logic vòng lặp cũ của bạn)
        for (PaperSizeRequest sizeRequest : paperRequest.getPaperSizes()) {
            PaperSize savedSize = paperSizeRepository.save(PaperSize.builder()
                    .paperId(savedPaper.getId())
                    .width(sizeRequest.getWidth())
                    .height(sizeRequest.getHeight())
                    .build());

            paperPriceRepository.save(PaperPrice.builder()
                    .paperSizeId(savedSize.getId())
                    .price(sizeRequest.getPrice())
                    .build());
        }
    }

    @Transactional
    public void createPaper(PaperDTO paperDTO) {
        if (paperRepository.existsByNameAndCompanyId(paperDTO.getName(), paperDTO.getCompanyId())) {
            throw new IllegalArgumentException("Paper with the same name and company already exists");
        }
        Paper paper = Paper.builder()
                .companyId(paperDTO.getCompanyId())
                .name(paperDTO.getName())
                .gsm(paperDTO.getGsm())
                .isActive(true)
                .build();
        paperRepository.save(paper);
    }   

    @Transactional
    public void deletePaper(Long paperId) {
        if (!paperRepository.existsById(paperId)) {
            throw new IllegalArgumentException("Paper not found with id: " + paperId);
        }
        // Xóa các PaperSize liên quan đến Paper trước khi xóa Paper
        paperSizeRepository.deleteByPaperId(paperId);
        paperRepository.deleteById(paperId);
    }

    @Transactional
    public List<PaperDTO> getPapersByCompanyId(Long companyId) {
        List<Paper> papers = paperRepository.findAll().stream()
                .filter(paper -> paper.getCompanyId().equals(companyId))
                .toList();
        return papers.stream()
                .map(paper -> {
                    PaperDTO dto = new PaperDTO();
                    dto.setCompanyId(paper.getCompanyId());
                    dto.setName(paper.getName());
                    dto.setGsm(paper.getGsm());
                    return dto;
                })
                .toList();
    }

    @Transactional
    public PaperDTO getPaperById(Long paperId, Long companyId) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new IllegalArgumentException("Paper not found with id: " + paperId));
        if (!paper.getCompanyId().equals(companyId)) {
            throw new IllegalArgumentException("Paper does not belong to the specified company");
        }
        PaperDTO dto = new PaperDTO();
        dto.setCompanyId(paper.getCompanyId());
        dto.setName(paper.getName());
        dto.setGsm(paper.getGsm());
        return dto;
    }

    @Transactional
    public List<PaperDTO> getAllPapersByCompany(Long companyId) {
        return paperRepository.findAll().stream()
                .filter(paper -> paper.getCompanyId().equals(companyId))
                .map(paper -> {
                    PaperDTO dto = new PaperDTO();
                    dto.setCompanyId(paper.getCompanyId());
                    dto.setName(paper.getName());
                    dto.setGsm(paper.getGsm());
                    return dto;
                })
                .toList();
    }
}
