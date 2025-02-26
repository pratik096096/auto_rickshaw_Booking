package com.example.autorickshawbooking.repository;

import com.example.autorickshawbooking.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByUsername(String username);
}
