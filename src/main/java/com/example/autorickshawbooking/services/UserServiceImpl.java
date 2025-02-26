//package com.example.autorickshawbooking.services;
//
//import com.example.autorickshawbooking.entity.User;
//import com.example.autorickshawbooking.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.core.userdetails.User.UserBuilder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserServiceImpl implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        User user = userRepository.findByEmail(email);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found");
//        }
//        return org.springframework.security.core.userdetails.User.withUsername(email)
//                .password(user.getPassword()) // Ensure this is an encoded password
//                .roles("USER") // Assign roles based on your requirements
//                .build();
//    }
//
//    public User saveUser(User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode password before saving
//        return userRepository.save(user);
//    }
//
//    public User findByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//}
