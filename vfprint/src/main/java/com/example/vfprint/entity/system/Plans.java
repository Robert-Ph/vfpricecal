package com.example.vfprint.entity.system;

import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "plans")
public class Plans {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String code;
    private String name;
    private float price;

    @Column(name = "duration_in_days")
    private int durationInDays;

    @Column(name = "max_users")
    private int maxUsers;

    @Column(name = "max_branches")
    private int maxbranches;

    @Column(name = "max_products")
    private int maxProducts;

    @Column(name = "is_custom")
    private boolean isCustom;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "description")
    private String description;
}
