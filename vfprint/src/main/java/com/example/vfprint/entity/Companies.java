package com.example.vfprint.entity;

import java.sql.Timestamp;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.example.vfprint.enums.CustomType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "companies")
public class Companies {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    private String code;
    private String name;
    private String phone;
    private String address;

    @Column(name = "create_at", updatable = false)
    @CreationTimestamp
    private Timestamp createAt;

    @Column(name = "tax_code")
    private String taxCode;
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", foreignKey = @ForeignKey(name = "fk_company_status"))
    private CompaniesStatus status;

    @Column(name = "logo_url")
    private String logoUrl;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<Account> accounts;

    @Enumerated(EnumType.STRING)
    @Column(name = "custom_type")
    private CustomType customType;

    @Column(name = "update_at")
    @CreationTimestamp
    private Timestamp updateAt;

    
}
