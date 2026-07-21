package com.cartconnect.backend.repository;

import com.cartconnect.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductId(Long productId);

    @Query("""
    SELECT AVG(r.rating)
    FROM Review r
    WHERE r.productId = :productId
    """)
    Double getAverageRating(@Param("productId") Long productId);

    @Query("""
    SELECT COUNT(r)
    FROM Review r
    WHERE r.productId = :productId
    """)
    Long getReviewCount(@Param("productId") Long productId);

}