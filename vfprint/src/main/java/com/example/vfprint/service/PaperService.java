package com.example.vfprint.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.PaperDTO;
import com.example.vfprint.entity.Paper;
import com.example.vfprint.repository.PaperRepository;
import com.example.vfprint.repository.PaperSizeRepository;

@Service
public class PaperService {
    
    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private PaperSizeRepository paperSizeRepository;


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
