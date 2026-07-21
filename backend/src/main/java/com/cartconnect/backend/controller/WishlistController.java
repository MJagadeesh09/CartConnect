package com.cartconnect.backend.controller;

import com.cartconnect.backend.entity.Wishlist;
import com.cartconnect.backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin
public class WishlistController {

    @Autowired
    private WishlistService service;

    @PostMapping("/add")
    public Wishlist add(
            @RequestBody Wishlist wishlist
    ) {
        return service.add(wishlist);
    }

    @GetMapping("/{email}")
    public List<Wishlist> get(
            @PathVariable String email
    ) {
        return service.get(email);
    }

    @DeleteMapping("/{id}")
    public void remove(
            @PathVariable Long id
    ) {
        service.remove(id);
    }
}