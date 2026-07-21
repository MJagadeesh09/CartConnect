package com.cartconnect.backend.service;

import com.cartconnect.backend.entity.Cart;
import com.cartconnect.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // ➕ ADD TO CART
    public Cart addToCart(Cart cart) {

        Optional<Cart> existing =
                cartRepository.findByEmailAndProductId(
                        cart.getEmail(),
                        cart.getProductId()
                );

        if (existing.isPresent()) {
            Cart item = existing.get();
            item.setQuantity(item.getQuantity() + 1);
            return cartRepository.save(item);
        }

        cart.setQuantity(1);
        return cartRepository.save(cart);
    }
    // 📦 GET CART
    public List<Cart> getCartItems(String email) {
        return cartRepository.findByEmail(email);
    }

    // 🗑 REMOVE ITEM
    public void removeFromCart(Long id) {
        cartRepository.deleteById(id);
    }

    // ✏️ UPDATE QUANTITY (MISSING METHOD - FIXED)
    public Cart updateCart(Long id, Cart cart) {

        Cart existing = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        existing.setQuantity(cart.getQuantity());

        return cartRepository.save(existing);
    }
}