//package com.example.autorickshawbooking.services;
//
//import com.example.autorickshawbooking.entity.Admin;
//import com.example.autorickshawbooking.repository.AdminRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class AdminServiceImpl implements AdminService {
//
//    @Autowired
//    private AdminRepository adminRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public boolean authenticate(String username, String password) {
//        Optional<Admin> optionalAdmin = adminRepository.findByUsername(username);
//        if (optionalAdmin.isPresent()) {
//            Admin admin = optionalAdmin.get();
//            return passwordEncoder.matches(password, admin.getPassword());
//        }
//        return false;
//    }
//
//    @Override
//    public String generateToken(String username) {
//        // Implement your token generation logic here
//        return "dummy-token-for-" + username;
//    }
//
//    @Override
//    public boolean register(Admin admin) {
//        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
//            return false; // Admin already exists
//        }
//        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
//        adminRepository.save(admin);
//        return true;
//    }
//}

package com.example.autorickshawbooking.services;

import com.example.autorickshawbooking.entity.Admin;
import com.example.autorickshawbooking.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements UserDetailsService, AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // You might want to inject this for password encryption

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUsername(username);
        if (admin == null) {
            throw new UsernameNotFoundException("Admin not found");
        }
        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(username);
        builder.password(admin.getPassword());
        builder.roles("ADMIN"); // You can adjust roles as needed
        return builder.build();
    }

    @Override
    public boolean authenticate(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin == null) {
            return false;
        }
        return passwordEncoder.matches(password, admin.getPassword());
    }

    @Override
    public boolean register(Admin admin) {
        if (adminRepository.findByUsername(admin.getUsername()) != null) {
            return false; // Admin already exists
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword())); // Encrypt password
        adminRepository.save(admin);
        return true;
    }
}






//
//package com.example.autorickshawbooking.services;
//
//import com.example.autorickshawbooking.entity.Admin;
//import com.example.autorickshawbooking.repository.AdminRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class AdminServiceImpl implements AdminService, UserDetailsService {
//
//    @Autowired
//    private AdminRepository adminRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public boolean authenticate(String username, String password) {
//        Optional<Admin> optionalAdmin = adminRepository.findByUsername(username);
//        if (optionalAdmin.isPresent()) {
//            Admin admin = optionalAdmin.get();
//            return passwordEncoder.matches(password, admin.getPassword());
//        }
//        return false;
//    }
//
//    @Override
//    public boolean register(Admin admin) {
//        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
//            return false; // Admin already exists
//        }
//        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
//        adminRepository.save(admin);
//        return true;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<Admin> optionalAdmin = adminRepository.findByUsername(username);
//        if (!optionalAdmin.isPresent()) {
//            throw new UsernameNotFoundException("Admin not found with username: " + username);
//        }
//        Admin admin = optionalAdmin.get();
//        return org.springframework.security.core.userdetails.User.withUsername(admin.getUsername())
//                .password(admin.getPassword())
//                .authorities("ROLE_ADMIN")
//                .build();
//    }
//}
