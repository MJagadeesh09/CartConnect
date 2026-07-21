package com.cartconnect.backend.service;

import com.cartconnect.backend.entity.Coupon;
import com.cartconnect.backend.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    // Return all coupons
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    // Validate a coupon
    public Coupon validateCoupon(String code) {

        Optional<Coupon> coupon =
                couponRepository.findByCode(code.toUpperCase());

        if (coupon.isEmpty()) {
            return null;
        }

        Coupon c = coupon.get();

        // Inactive coupon
        if (!c.getActive()) {
            return null;
        }

        // Expired coupon
        if (c.getExpiryDate().isBefore(LocalDate.now())) {
            return null;
        }

        return c;
    }
}