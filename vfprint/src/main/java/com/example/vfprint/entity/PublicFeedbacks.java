package com.example.vfprint.entity;

import java.sql.Timestamp;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "public_feedbacks")
public class PublicFeedbacks {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name")
    private String fullName;

    private String email;
    private String phone;
    private String subject;
    private String content;

    @Column(name = "create_at")
    private Timestamp createAt;

    @Column(name ="updtae_at")
    private Timestamp updateAt;
}
