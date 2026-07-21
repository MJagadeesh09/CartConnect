package com.cartconnect.backend.service;

import com.cartconnect.backend.dto.ProductResponseDTO;
import com.cartconnect.backend.entity.Product;
import com.cartconnect.backend.repository.ProductRepository;
import com.cartconnect.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // Add Product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Get All Products mapped to ProductResponseDTO
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> {
                    Double avg = reviewRepository.getAverageRating(product.getId());
                    Long count = reviewRepository.getReviewCount(product.getId());

                    if (avg == null) {
                        avg = 0.0;
                    }

                    if (count == null) {
                        count = 0L;
                    }

                    return new ProductResponseDTO(
                            product.getId(),
                            product.getName(),
                            product.getDescription(),
                            product.getImageUrl(),
                            product.getCategory(),
                            product.getBadge(),
                            product.getDiscount(),
                            product.getPrice(),
                            Math.round(avg * 10.0) / 10.0,
                            count
                    );
                })
                .toList();
    }

    // Get Product by ID
    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    // Update Product
    public Product updateProduct(Long id, Product product) {
        Product existing = productRepository.findById(id).orElseThrow();

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setImageUrl(product.getImageUrl());
        existing.setCategory(product.getCategory());
        existing.setBadge(product.getBadge());
        existing.setDiscount(product.getDiscount());

        return productRepository.save(existing);
    }

    // Delete Product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}