package com.example.autorickshawbooking.services;

import com.example.autorickshawbooking.entity.Admin;

public interface AdminService {
    boolean authenticate(String username, String password);
    boolean register(Admin admin);
}
