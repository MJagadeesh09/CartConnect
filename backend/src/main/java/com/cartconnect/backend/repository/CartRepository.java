package com.cartconnect.backend.repository;

import com.cartconnect.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByEmailAndProductId(String email, Long productId);
    List<Cart> findByEmail(String email);
    long count();
}