package com.example.vfprint.entity.system;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "plan_features")
public class PlanFeatures {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
      // Khoá ngoại tới bảng company, nhưng chỉ lưu id của company, không cần ánh xạ đối tượng company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id",foreignKey = @ForeignKey(name = "fk_plans_features_plan"))
    private Plans plan;

        // Khoá ngoại tới bảng company, nhưng chỉ lưu id của company, không cần ánh xạ đối tượng company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feature_id",foreignKey = @ForeignKey(name = "fk_plans_features_feature"))
    private Features feature;
}
