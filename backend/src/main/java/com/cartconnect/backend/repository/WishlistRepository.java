package com.cartconnect.backend.repository;

import com.cartconnect.backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByEmail(String email);

    Optional<Wishlist> findByEmailAndProductId(
            String email,
            Long productId

    );
    long count();
}