package com.example.vfprint.entity;

import java.sql.Timestamp;

import com.example.vfprint.enums.LevelLog;
import com.example.vfprint.enums.StatusLog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class LogUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LevelLog level;
    private String action;
    private Account account;
    private String content;
    private StatusLog status;

    @Column(name = "create_at")
    private Timestamp createAt;
}
