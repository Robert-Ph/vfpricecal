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
@Builder
@Table(name = "profit")
public class Profit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Khoá ngoại tới bảng company, nhưng chỉ lưu id của company, không cần ánh xạ đối tượng company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id",foreignKey = @ForeignKey(name = "fk_profit_company"))
    private Companies company;

    private String name;
    private float percentage;
    
}
