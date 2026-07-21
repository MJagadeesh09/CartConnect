package com.cartconnect.backend.controller;

import com.cartconnect.backend.entity.Coupon;
import com.cartconnect.backend.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/{code}")
    public Coupon validateCoupon(@PathVariable String code) {
        return couponService.validateCoupon(code);
    }

    @GetMapping
    public List<Coupon> getAllCoupons() {
        return couponService
                .getAllCoupons();
    }
}