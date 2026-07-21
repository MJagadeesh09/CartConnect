package com.cartconnect.backend.repository;

import com.cartconnect.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByEmail(String email);
    List<Order> findAll();
    long count();
}
