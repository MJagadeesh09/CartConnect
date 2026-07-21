package com.cartconnect.backend.controller;

import com.cartconnect.backend.entity.Order;
import com.cartconnect.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place/{email}")
    public String placeOrder(
            @PathVariable String email) {

        return orderService.placeOrder(email);
    }

    @GetMapping("/{email}")
    public List<Order> getOrders(
            @PathVariable String email) {

        return orderService.getOrders(email);
    }

    @PutMapping("/cancel/{id}")
    public String cancelOrder(@PathVariable Long id) {
        return orderService.cancelOrder(id);
    }
}