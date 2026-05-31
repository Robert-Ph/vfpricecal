package com.example.vfprint.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vfprint.entity.CompaniesStatus;
import java.util.UUID;

@Repository
public interface CompaniesStatusRepository extends JpaRepository<CompaniesStatus, UUID> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh ở đây nếu cần
    
}
