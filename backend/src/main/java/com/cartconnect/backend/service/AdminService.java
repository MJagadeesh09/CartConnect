package com.cartconnect.backend.service;

import com.cartconnect.backend.dto.DashboardStats;
import com.cartconnect.backend.entity.Order;
import com.cartconnect.backend.repository.OrderRepository;
import com.cartconnect.backend.repository.ProductRepository;
import com.cartconnect.backend.repository.ReviewRepository;
import com.cartconnect.backend.repository.UserRepository;
import com.cartconnect.backend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public DashboardStats getDashboardStats() {

        long users = userRepository.count();

        long products = productRepository.count();

        long orders = orderRepository.count();

        long wishlist = wishlistRepository.count();

        long reviews = reviewRepository.count();

        double revenue = 0;

        for (Order order : orderRepository.findAll()) {

            if (!"CANCELLED".equalsIgnoreCase(order.getStatus())) {

                revenue += order.getPrice() * order.getQuantity();
            }
        }

        return new DashboardStats(
                users,
                products,
                orders,
                revenue,
                wishlist,
                reviews
        );
    }
}