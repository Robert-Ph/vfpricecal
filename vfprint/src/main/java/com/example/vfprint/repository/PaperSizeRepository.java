package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.PaperSize;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaperSizeRepository  extends JpaRepository<PaperSize, UUID> {

    List<PaperSize> findByPaperId(Long paperId);
    void deleteByPaperId(Long paperId);
    boolean existsByPaperId(Long paperId);
    boolean existsByPaperIdAndWidthAndHeight(Long paperId, int width, int height);
    Optional<PaperSize> findByIdAndPaperId(UUID id, Long paperId);
    boolean existsByWidthAndHeight(int width, int height);

    @Modifying
    @Query("""
        DELETE FROM PaperSize ps WHERE ps.paperId = :paperId
            
            """)
    void deleteByPaperIdCustom(@Param("paperId") Long paperId);
}
