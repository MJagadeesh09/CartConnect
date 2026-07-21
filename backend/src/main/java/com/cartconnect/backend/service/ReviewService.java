package com.cartconnect.backend.service;

import com.cartconnect.backend.dto.ReviewStatsDTO;
import com.cartconnect.backend.entity.Review;
import com.cartconnect.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviews(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    public ReviewStatsDTO getReviewStats(Long productId) {

        Double average = reviewRepository.getAverageRating(productId);
        Long totalReviews = reviewRepository.getReviewCount(productId);

        if (average == null) {
            average = 0.0;
        }

        if (totalReviews == null) {
            totalReviews = 0L;
        }

        return new ReviewStatsDTO(
                Math.round(average * 10.0) / 10.0,
                totalReviews
        );
    }
}