package com.cartconnect.backend.service;

import com.cartconnect.backend.entity.Wishlist;
import com.cartconnect.backend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository repository;

    public Wishlist add(Wishlist wishlist) {

        return repository
                .findByEmailAndProductId(
                        wishlist.getEmail(),
                        wishlist.getProductId()
                )
                .orElseGet(() -> repository.save(wishlist));
    }

    public List<Wishlist> get(String email) {

        return repository.findByEmail(email);

    }

    public void remove(Long id) {

        repository.deleteById(id);

    }
}