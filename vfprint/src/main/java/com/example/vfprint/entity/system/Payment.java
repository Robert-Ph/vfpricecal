package com.example.vfprint.entity.system;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;
import jakarta.persistence.EnumType;
import com.example.vfprint.enums.ActionType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ForeignKey;
import java.sql.Timestamp;
import java.math.BigDecimal;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "payments")
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_status_id",foreignKey = @ForeignKey(name = "fk_payment_subscription_status"))
    private CompansySubscriptions compansySubscription;

    private BigDecimal amount;

    private String currency;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id",foreignKey = @ForeignKey(name = "fk_payment_method"))
    private PaymentMethod paymentMethod;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_status_id",foreignKey = @ForeignKey(name = "fk_payment_status"))
    private PaymentStatus paymentStatus;

    private String transactionCode;

    @Column(name = "paid_at")
    private Timestamp paidAt;


    @Column(name = "created_at")
    private Timestamp createdAt;
   
}
