package com.cartconnect.backend.controller;

import com.cartconnect.backend.entity.Cart;
import com.cartconnect.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    // ➕ ADD TO CART
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    // 📦 GET CART BY EMAIL
    @GetMapping("/{email}")
    public List<Cart> getCart(@PathVariable String email) {
        return cartService.getCartItems(email);
    }

    // ✏️ UPDATE QUANTITY (IMPORTANT FOR + / - BUTTONS)
    @PutMapping("/{id}")
    public Cart updateCart(@PathVariable Long id, @RequestBody Cart cart) {
        return cartService.updateCart(id, cart);
    }

    // 🗑 DELETE ITEM
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        cartService.removeFromCart(id);
    }
}