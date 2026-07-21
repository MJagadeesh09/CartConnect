package com.cartconnect.backend.controller;

import com.cartconnect.backend.dto.ReviewStatsDTO;
import com.cartconnect.backend.entity.Review;
import com.cartconnect.backend.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping("/{productId}")
    public List<Review> getReviews(@PathVariable Long productId) {
        return reviewService.getReviews(productId);
    }

    @GetMapping("/product/{productId}/stats")
    public ReviewStatsDTO getReviewStats(@PathVariable Long productId) {
        return reviewService.getReviewStats(productId);
    }
}