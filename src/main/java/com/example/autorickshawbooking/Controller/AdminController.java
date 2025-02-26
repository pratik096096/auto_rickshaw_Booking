//package com.example.autorickshawbooking.Controller;
//
//import com.example.autorickshawbooking.entity.Admin;
//import com.example.autorickshawbooking.services.AdminService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/admin")
//public class AdminController {
//
//    @Autowired
//    private AdminService adminService;
//
//    @PostMapping("/login")
//    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
//        boolean isAuthenticated = adminService.authenticate(admin.getUsername(), admin.getPassword());
//
//        if (isAuthenticated) {
//            String token = adminService.generateToken(admin.getUsername());
//            return ResponseEntity.ok(token);
//        } else {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
//        boolean isRegistered = adminService.register(admin);
//        if (isRegistered) {
//            return ResponseEntity.ok("Admin registered successfully");
//        } else {
//            return ResponseEntity.status(400).body("Admin registration failed");
//        }
//    }
//}

package com.example.autorickshawbooking.Controller;

import com.example.autorickshawbooking.entity.Admin;
import com.example.autorickshawbooking.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(admin.getUsername(), admin.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok("Login successful");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        boolean isRegistered = adminService.register(admin);
        if (isRegistered) {
            return ResponseEntity.ok("Admin registered successfully");
        } else {
            return ResponseEntity.status(400).body("Admin registration failed");
        }
    }
}
