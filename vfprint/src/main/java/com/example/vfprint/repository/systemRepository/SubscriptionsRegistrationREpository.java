package com.example.vfprint.repository.systemRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import com.example.vfprint.entity.system.SubscriptionsRegistration;

@Repository
public interface SubscriptionsRegistrationREpository extends JpaRepository<SubscriptionsRegistration, UUID>{
    
}
