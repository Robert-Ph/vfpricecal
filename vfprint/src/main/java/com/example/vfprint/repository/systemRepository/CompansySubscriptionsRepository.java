package com.example.vfprint.repository.systemRepository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vfprint.entity.system.CompansySubscriptions;
import com.example.vfprint.entity.Companies;
import java.util.Optional;


@Repository
public interface CompansySubscriptionsRepository extends JpaRepository<CompansySubscriptions, UUID>{
    Optional<CompansySubscriptions> findByCompany(Companies company);
}
