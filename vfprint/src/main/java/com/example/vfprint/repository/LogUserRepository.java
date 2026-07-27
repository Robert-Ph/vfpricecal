package com.example.vfprint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vfprint.entity.Companies;
import com.example.vfprint.entity.LogUser;

@Repository
public interface LogUserRepository extends JpaRepository<LogUser, Long> {
    List<LogUser> findByCompany(Companies companies);
}
