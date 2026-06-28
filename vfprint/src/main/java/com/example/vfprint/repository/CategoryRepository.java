package com.example.vfprint.repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID>  {
    boolean existsByName(String name);
    void deleteByName(String name);
    Category findByName(String name);
    List<Category> findByCompanyId(UUID companyId);
    Optional<Category> findByIdAndCompanyId(UUID id, UUID companyId);
}
