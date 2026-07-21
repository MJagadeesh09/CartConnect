package com.cartconnect.backend.dto;

public class DashboardStats {

    private Long users;
    private Long products;
    private Long orders;
    private Double revenue;
    private Long wishlistItems;
    private Long reviews;

    public DashboardStats() {
    }

    public DashboardStats(Long users,
                          Long products,
                          Long orders,
                          Double revenue,
                          Long wishlistItems,
                          Long reviews) {

        this.users = users;
        this.products = products;
        this.orders = orders;
        this.revenue = revenue;
        this.wishlistItems = wishlistItems;
        this.reviews = reviews;
    }

    public Long getUsers() {
        return users;
    }

    public void setUsers(Long users) {
        this.users = users;
    }

    public Long getProducts() {
        return products;
    }

    public void setProducts(Long products) {
        this.products = products;
    }

    public Long getOrders() {
        return orders;
    }

    public void setOrders(Long orders) {
        this.orders = orders;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }

    public Long getWishlistItems() {
        return wishlistItems;
    }

    public void setWishlistItems(Long wishlistItems) {
        this.wishlistItems = wishlistItems;
    }

    public Long getReviews() {
        return reviews;
    }

    public void setReviews(Long reviews) {
        this.reviews = reviews;
    }
}