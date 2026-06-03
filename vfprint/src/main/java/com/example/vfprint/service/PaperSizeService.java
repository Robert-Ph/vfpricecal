package com.example.vfprint.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vfprint.dto.PaperSizeDTO;
import com.example.vfprint.entity.Paper;
import com.example.vfprint.entity.PaperSize;
import com.example.vfprint.repository.PaperRepository;
import com.example.vfprint.repository.PaperSizeRepository;

@Service
public class PaperSizeService {
    
    @Autowired
    private PaperSizeRepository paperSizeRepository;

    @Autowired
    private PaperRepository paperRepository;


    //Tao moi 1 paper size cho 1 paper, neu da co thi khong tao nua
    @Transactional
    public void createPaperSize(List<PaperSizeDTO> dtos){
       if (dtos == null || dtos.isEmpty()) {
        return;
    }

    // 1. Gom nhóm PaperId để check database 1 lần duy nhất (tối ưu hiệu suất)
    Set<UUID> paperIds = dtos.stream()
            .map(PaperSizeDTO::getPaperId)
            .collect(Collectors.toSet());

    for (UUID pId : paperIds) {
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
                    .paper(Paper.builder().id(dto.getPaperId()).build())
                    .width(dto.getWidth())
                    .height(dto.getHeight())
                    .price(dto.getPrice())
                    .isActive(true)
                    .build())
            .toList();

        // 3. Lưu toàn bộ (nếu danh sách lọc xong không rỗng)
        if (!entitiesToSave.isEmpty()) {
            paperSizeRepository.saveAll(entitiesToSave);
        }
    }

     //Tao moi 1 paper size cho 1 paper, neu da co thi khong tao nua
    @Transactional
    public void createOnePaperSize(PaperSizeDTO dtos){
      if (paperSizeRepository.existsByPaperIdAndWidthAndHeight(dtos.getPaperId(),dtos.getWidth(), dtos.getHeight())) {
        return;
      }

      PaperSize paperSize = PaperSize.builder()
                            .paper(Paper.builder().id(dtos.getPaperId()).build())
                            .width(dtos.getWidth())
                            .height(dtos.getHeight())
                            .price(dtos.getPrice())
                            .isActive(true)
                            .build();
    paperSizeRepository.save(paperSize);
      
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
    public void deletePaperSize(UUID id, UUID paperId){
          PaperSize paper = paperSizeRepository
            .findByIdAndPaperId(id, paperId)
            .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Paper not found with id: " + paperId
                    )
            );
        
        paperSizeRepository.delete(paper);;
        
    }

    @Transactional(readOnly = true)
    public void deletePaperSizesByPaperId(UUID paperId){
        paperSizeRepository.deleteByPaperId(paperId);
    }

    @Transactional(readOnly = true)
    public PaperSizeDTO getPaperSizeById(UUID paperId){
        return paperSizeRepository.findById(paperId)
                .map(ps -> {
                    PaperSizeDTO dto = new PaperSizeDTO();
                    dto.setPaperId(ps.getPaper().getId());
                    dto.setWidth(ps.getWidth());
                    dto.setHeight(ps.getHeight());
                    dto.setPrice(ps.getPrice());
                    return dto;
                })
                .orElseThrow(() -> new RuntimeException("Paper size not found"));
    }

    @Transactional
    public List<PaperSizeDTO> getPaperSizesByPaperId(UUID paperId){
        return paperSizeRepository.findAll()
                .stream()
                .filter(ps -> ps.getPaper().getId().equals(paperId))
                .map(ps -> {
                    PaperSizeDTO dto = PaperSizeDTO.builder()
                            .id(ps.getId())
                            .paperId(ps.getPaper().getId())
                            .width(ps.getWidth())
                            .height(ps.getHeight())
                            .price(ps.getPrice())
                            .build();
                    return dto;
                })
                .toList();
    }
}
