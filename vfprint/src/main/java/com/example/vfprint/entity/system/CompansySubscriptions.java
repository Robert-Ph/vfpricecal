package com.example.vfprint.entity.system;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import com.example.vfprint.entity.Companies;
import jakarta.persistence.ForeignKey;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "company_subscriptions")
public class CompansySubscriptions {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

     // Khoá ngoại tới bảng company, nhưng chỉ lưu id của company, không cần ánh xạ đối tượng company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id",foreignKey = @ForeignKey(name = "fk_category_company"))
    private Companies company;

       // Khoá ngoại tới bảng plans, nhưng chỉ lưu id của plan, không cần ánh xạ đối tượng plan
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id",foreignKey = @ForeignKey(name = "fk_company_subscriptions_plan"))
    private Plans plan;

    // Khoá ngoại tới bảng subscription_types, nhưng chỉ lưu id của subscription_type, không cần ánh xạ đối tượng subscription_type
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_type_id",foreignKey = @ForeignKey(name = "fk_company_subscriptions_subscription_type"))
    private SubscriptionTypes subscriptionType;

    // Khoá ngoại tới bảng subscription_statuses, nhưng chỉ lưu id của subscription_status, không cần ánh xạ đối tượng subscription_status
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_status_id",foreignKey = @ForeignKey(name = "fk_company_subscriptions_subscription_status"))
    private SubscriptionStatuses subscriptionStatus;

  
    @Column(name = "start_date")
    private Timestamp startDate;

    @Column(name = "end_date")
    private Timestamp endDate;

    @Column(name = "auto_renewal_date")
    private Boolean autoRenewalDate;

    @Column(name = "created_at")
    private Timestamp createdAt;

    


}
