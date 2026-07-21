package com.cartconnect.backend.repository;

import com.cartconnect.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {
    long count();
}