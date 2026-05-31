package com.example.vfprint.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vfprint.entity.UserStatus;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface UserStatusREpository extends JpaRepository<UserStatus, UUID> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh ở đây nếu cần
    Optional<UserStatus> findByCode(String code);
}
