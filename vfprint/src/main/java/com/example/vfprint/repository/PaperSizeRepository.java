package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.PaperSize;
import java.util.List;

@Repository
public interface PaperSizeRepository  extends JpaRepository<PaperSize, Long> {
   
    List<PaperSize> findByPaperId(Long paperId);
    
}
