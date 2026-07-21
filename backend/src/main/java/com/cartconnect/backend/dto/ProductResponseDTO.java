package com.cartconnect.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponseDTO {

    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private String category;

    private String badge;

    private Integer discount;

    private Double price;

    private Double averageRating;

    private Long totalReviews;
}