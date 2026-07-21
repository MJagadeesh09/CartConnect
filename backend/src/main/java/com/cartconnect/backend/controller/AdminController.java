package com.cartconnect.backend.controller;

import com.cartconnect.backend.dto.DashboardStats;
import com.cartconnect.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public DashboardStats dashboard() {

        return adminService.getDashboardStats();
    }
}