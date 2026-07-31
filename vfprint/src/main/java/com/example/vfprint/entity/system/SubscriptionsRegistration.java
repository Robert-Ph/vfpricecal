package com.example.vfprint.entity.system;

import java.util.UUID;
import java.sql.Timestamp;
import jakarta.persistence.EnumType;
import com.example.vfprint.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
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
@Table(name = "plan_registrations")
public class SubscriptionsRegistration {
    
        @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "company_res_id")
    private UUID companyResId;

    @Column(name = "plan_id")
    private UUID planID;

    private int month;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "create_at")
    private Timestamp createAt;
}
