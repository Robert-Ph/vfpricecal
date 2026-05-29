package com.example.vfprint.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

     // Khoá ngoại tới bảng company, nhưng chỉ lưu id của company, không cần ánh xạ đối tượng company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id",foreignKey = @ForeignKey(name = "fk_product_company"))
    private Companies company;

    private String name;
    private String description;
    private Boolean is_active;
}
