package com.example.vfprint.entity;

import java.sql.Timestamp;
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
@Table(name = "processing_tier")
public class ProcessingTier {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "processing_id", foreignKey = @ForeignKey(name = "fk_processing_tier"))
    private Processing processing;

    @Column(name = "min_volume")
    private double minVolume;

    @Column(name = "max_volume")
    private double maxVolume;

    private double price;

    @Column(name = "min_charge")
    private double minCharge;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "create_at")
    private Timestamp createAt;
}
