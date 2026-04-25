package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>  {
    boolean existsByName(String name);
    void deleteByName(String name);
    Category findByName(String name);
}
