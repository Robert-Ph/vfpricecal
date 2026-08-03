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
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import java.util.UUID;
import com.example.vfprint.enums.ConfigDataType;
import java.sql.Timestamp;
import jakarta.persistence.ForeignKey;
import com.example.vfprint.enums.ConfigGroupCode;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "system_config")
public class SystemConfig {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "config_key", unique = true, nullable = false)
    private String configKey;

    @Column(name = "config_value", nullable = false)
    private String configValue;

    @Column(name = "config_type")
    private ConfigDataType configType;

    @Column(name = "description")
    private String description;

    @Column(name = "group_code")
    private ConfigGroupCode groupCode;

    @Column(name = "update_at")
    private Timestamp updateAt;

    @Column(name = "create_at")
    private Timestamp createAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "updated_by",
            foreignKey = @ForeignKey(name = "fk_system_config_account")
    )
    private AccountSystem updatedBy;

    @Column(name = "is_active")
    private boolean isActive;

}
