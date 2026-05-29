package com.example.vfprint.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ForeignKey;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "paper")
@Builder
public class Paper {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

     // Khoá ngoại tới bảng company, nhưng chỉ lưu id của company, không cần ánh xạ đối tượng company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id",foreignKey = @ForeignKey(name = "fk_paper_company"))
    private Companies company;
    private String name;
    private String gsm;

    @Column(name = "is_active")
    private Boolean isActive;
}
