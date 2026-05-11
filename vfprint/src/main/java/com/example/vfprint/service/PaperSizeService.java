package com.example.vfprint.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.repository.PaperPriceRepository;
import com.example.vfprint.dto.PaperSizeDTO;
import com.example.vfprint.entity.PaperSize;
import com.example.vfprint.repository.PaperRepository;
import com.example.vfprint.repository.PaperSizeRepository;

@Service
public class PaperSizeService {
    
    @Autowired
    private PaperSizeRepository paperSizeRepository;

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private PaperPriceRepository paperPriceRepository;



    //Tao moi 1 paper size cho 1 paper, neu da co thi khong tao nua
    @Transactional
    public void createPaperSize(List<PaperSizeDTO> dtos){
       if (dtos == null || dtos.isEmpty()) {
        return;
    }

    // 1. Gom nhóm PaperId để check database 1 lần duy nhất (tối ưu hiệu suất)
    Set<Long> paperIds = dtos.stream()
            .map(PaperSizeDTO::getPaperId)
            .collect(Collectors.toSet());

    for (Long pId : paperIds) {
        if (!paperRepository.existsById(pId)) {
            throw new RuntimeException("Paper không tồn tại với ID: " + pId);
        }
    }

    // 2. Chuyển đổi và kiểm tra trùng lặp
    List<PaperSize> entitiesToSave = dtos.stream()
            .filter(dto -> {
                // Kiểm tra xem size này đã tồn tại trong DB chưa
                return !paperSizeRepository.existsByPaperIdAndWidthAndHeight(
                        dto.getPaperId(), dto.getWidth(), dto.getHeight());
            })
            .map(dto -> PaperSize.builder()
                    .paperId(dto.getPaperId())
                    .width(dto.getWidth())
                    .height(dto.getHeight())
                    .isActive(true)
                    .build())
            .toList();

    // 3. Lưu toàn bộ (nếu danh sách lọc xong không rỗng)
    if (!entitiesToSave.isEmpty()) {
        paperSizeRepository.saveAll(entitiesToSave);
    }
}

    @Transactional
    public PaperSize updatePaperSize(PaperSize paperSize){
        PaperSize existingPaperSize = paperSizeRepository.findById(paperSize.getId())
                .orElseThrow(() -> new RuntimeException("Paper size not found"));
        
        existingPaperSize.setWidth(paperSize.getWidth());
        existingPaperSize.setHeight(paperSize.getHeight());
        
        return paperSizeRepository.save(existingPaperSize);
    }

    @Transactional
    public void deletePaperSize(Long id){
        paperPriceRepository.deleteByPaperSizeId(id);
        paperSizeRepository.deleteById(id);
        
    }

    @Transactional(readOnly = true)
    public void deletePaperSizesByPaperId(Long paperId){
        paperSizeRepository.deleteByPaperId(paperId);
    }

    @Transactional(readOnly = true)
    public PaperSizeDTO getPaperSizeById(Long paperId){
        return paperSizeRepository.findById(paperId)
                .map(ps -> {
                    PaperSizeDTO dto = new PaperSizeDTO();
                    dto.setPaperId(ps.getPaperId());
                    dto.setWidth(ps.getWidth());
                    dto.setHeight(ps.getHeight());
                    return dto;
                })
                .orElseThrow(() -> new RuntimeException("Paper size not found"));
    }

    @Transactional
    public List<PaperSizeDTO> getPaperSizesByPaperId(Long paperId){
        return paperSizeRepository.findAll()
                .stream()
                .filter(ps -> ps.getPaperId().equals(paperId))
                .map(ps -> {
                    PaperSizeDTO dto = new PaperSizeDTO();
                    dto.setPaperId(ps.getPaperId());
                    dto.setWidth(ps.getWidth());
                    dto.setHeight(ps.getHeight());
                    return dto;
                })
                .toList();
    }
}
