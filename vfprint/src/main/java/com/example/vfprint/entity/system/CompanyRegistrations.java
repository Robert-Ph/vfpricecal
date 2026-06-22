package com.example.vfprint.entity.system;

import java.sql.Timestamp;
import java.util.UUID;

import com.example.vfprint.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "company_registrations")
public class CompanyRegistrations {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name")
    private String fullName;

    private String name;
    private String email;
    private String phone;
    private String address;

    @Column(name = "tax_code")
    private String taxCode;

    private Status status;

    @Column(name = "create_at")
    private Timestamp createAt;

}
