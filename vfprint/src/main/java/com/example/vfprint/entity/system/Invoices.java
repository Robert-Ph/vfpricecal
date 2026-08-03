package com.example.vfprint.entity.system;

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
import jakarta.persistence.Column;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ForeignKey;

import com.example.vfprint.enums.ActionType;
import com.example.vfprint.enums.InvoiceStatus;
import java.math.BigDecimal;
import java.sql.Timestamp;
import jakarta.persistence.EnumType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "invoices")
public class Invoices {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id",foreignKey = @ForeignKey(name = "fk_invoices_subscription_statuses"))
    private CompansySubscriptions compansySubscription;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "vat_rate")
    private BigDecimal vatRate;
    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "tax_amount")
    private BigDecimal taxAmount;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "action_type")
    private ActionType actionType;

    @Column(name = "issued_at")
    private Timestamp issuedAt;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
