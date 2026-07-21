package com.cartconnect.backend.service;

import com.cartconnect.backend.entity.Cart;
import com.cartconnect.backend.entity.Order;
import com.cartconnect.backend.repository.CartRepository;
import com.cartconnect.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    public String placeOrder(String email) {

        List<Cart> cartItems =
                cartRepository.findByEmail(email);

        if (cartItems.isEmpty()) {
            return "Cart is empty";
        }

        for (Cart cart : cartItems) {

            Order order = new Order();

            order.setEmail(cart.getEmail());
            order.setProductName(cart.getProductName());
            order.setImageUrl(cart.getImageUrl());
            order.setPrice(cart.getPrice());
            order.setQuantity(cart.getQuantity());
            order.setStatus("PLACED");

            orderRepository.save(order);
        }

        cartRepository.deleteAll(cartItems);

        return "Order placed successfully";
    }

    public List<Order> getOrders(String email) {
        return orderRepository.findByEmail(email);
    }

    public String cancelOrder(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus("CANCELLED");
            orderRepository.save(order);
            return "Order cancelled successfully";
        }

        return "Order not found";
    }
}