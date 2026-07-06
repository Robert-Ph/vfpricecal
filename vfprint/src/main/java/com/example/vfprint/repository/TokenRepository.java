package com.example.vfprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.vfprint.entity.Token;
import java.util.List;
import java.util.UUID;
@Repository
public interface TokenRepository extends JpaRepository<Token, String> {

    @Query("""
       SELECT t FROM Token t
       WHERE t.account.id = :accountId
       AND t.revoked = false
       """)
List<Token> findAllValidTokenByAccount(UUID accountId);
}
