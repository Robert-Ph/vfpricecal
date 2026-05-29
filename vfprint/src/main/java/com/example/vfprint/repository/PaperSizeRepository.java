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

    List<PaperSize> findByPaperId(UUID paperId);
    void deleteByPaperId(UUID paperId);
    boolean existsByPaperId(UUID paperId);
    boolean existsByPaperIdAndWidthAndHeight(UUID paperId, int width, int height);
    Optional<PaperSize> findByIdAndPaperId(UUID id, UUID paperId);
    boolean existsByWidthAndHeight(int width, int height);

    @Modifying
    @Query("""
        DELETE FROM PaperSize ps WHERE ps.paper.id = :paperId
            
            """)
    void deleteByPaperIdCustom(@Param("paperId") UUID paperId);
}
