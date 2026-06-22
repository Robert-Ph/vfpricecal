package com.example.vfprint.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.ForeignKey;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "paper_size")
@Builder
public class PaperSize {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paper_id",foreignKey = @ForeignKey(name = "fk_papersize_paper"))
    private Paper paper; // Khoá ngoại tới bảng paper, nhưng chỉ lưu id của paper, không cần ánh xạ đối tượng paper
    private int width;
    private int height;

    @Column(name = "is_active")
    private Boolean isActive;
    private double price; // Giá của size này
}
