package com.cartconnect.backend.controller;

import com.cartconnect.backend.entity.User;
import com.cartconnect.backend.enums.Role;
import com.cartconnect.backend.repository.UserRepository;
import com.cartconnect.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body("Error: Email is already in use!");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // Default role
        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
            @RequestBody User loginRequest) {

        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user != null &&
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        user.getPassword())) {

            String token =
                    jwtUtil.generateToken(user.getEmail());

            return ResponseEntity.ok(
                    Collections.singletonMap(
                            "token",
                            token
                    )
            );
        }

        return ResponseEntity.status(401)
                .body("Invalid credentials");
    }
}