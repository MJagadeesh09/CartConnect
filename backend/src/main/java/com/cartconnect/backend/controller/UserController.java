package com.cartconnect.backend.controller;

import com.cartconnect.backend.entity.User;
import com.cartconnect.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // 1️⃣ Register a new user – POST request
    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }

    // 2️⃣ Fetch all users – GET request (list all)
    @GetMapping
    public List<User> fetchAllUsers() {
        return userService.getAllUsers();
    }

    // 3️⃣ Fetch current logged-in user profile – GET request
    @GetMapping("/profile")
    public ResponseEntity<?> fetchCurrentUserProfile(Authentication authentication) {
        // Spring Security automatically populates the 'authentication' object from your valid JWT token
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized access"));
        }

        String loggedInUserEmail = authentication.getName();

        // Safe baseline map response to verify authentication works instantly in Postman
        // 💡 Shortcut: If your UserService has a method to find by email, you can later replace this with:
        // User user = userService.findByEmail(loggedInUserEmail); return ResponseEntity.ok(user);
        return ResponseEntity.ok(Map.of(
                "message", "Profile fetched successfully!",
                "email", loggedInUserEmail,
                "roles", authentication.getAuthorities().toString(),
                "status", "Authenticated"
        ));
    }
}