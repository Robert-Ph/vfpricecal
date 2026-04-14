package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.PaperSize;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface PaperSizeRepository  extends JpaRepository<PaperSize, Long> {
   
    @Query("""
       SELECT p FROM PaperSize p
       WHERE p.name LIKE %:param% 
       OR CAST(p.width AS string) LIKE %:param% 
       OR CAST(p.height AS string) LIKE %:param%
       """)
    List<PaperSize> search(@Param("param") String param);

    List<PaperSize> findByCompanyId(Long companyId);
    
}
