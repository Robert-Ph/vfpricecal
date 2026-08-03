package com.example.vfprint.entity.system;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import jakarta.persistence.GenerationType;
import java.sql.Timestamp;
import jakarta.persistence.ForeignKey;
import com.example.vfprint.entity.UserStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "account_system")
public class AccountSystem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String email;
    private String password;
    private String name;

     // Khoá ngoại tới bảng subscription_statuses, nhưng chỉ lưu id của subscription_status, không cần ánh xạ đối tượng subscription_status
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "system_roler_id",foreignKey = @ForeignKey(name = "fk_account_system_roler"))
    private RolesSystem role;

        // Khoá ngoại tới bảng user_statuses, nhưng chỉ lưu id của user_status, không cần ánh xạ đối tượng user_status
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_status_id",foreignKey = @ForeignKey(name = "fk_account_system_user_status"))
    private UserStatus userStatus;

    @Column(name = "created_at")
    private Timestamp createdAt;


}
