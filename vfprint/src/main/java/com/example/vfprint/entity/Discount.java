package com.example.vfprint.entity;

import java.util.UUID;

import com.example.vfprint.enums.Priority;

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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "discount")
@Builder
public class Discount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

     // Khoá ngoại tới bảng company, nhưng chỉ lưu id của company, không cần ánh xạ đối tượng company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id",foreignKey = @ForeignKey(name = "fk_discount_company"))
    private Companies company;

    private String name;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(nullable = false)
    private Priority priority = Priority.NORMAL;
}
