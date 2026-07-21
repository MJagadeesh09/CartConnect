package com.cartconnect.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewStatsDTO {

    private Double averageRating;

    private Long totalReviews;

}