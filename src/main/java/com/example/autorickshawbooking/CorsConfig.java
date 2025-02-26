package com.example.autorickshawbooking;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class CorsConfig {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/api/places")  // <- Specify your API path
//                        .allowedOrigins("http://localhost:3000")  // <- Allow React frontend URL
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowCredentials(true);
//
//                registry.addMapping("/api/drivers")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("GET", "POST")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//
//                registry.addMapping("/api/drivers/register")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("GET", "POST")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//
////                registry.addMapping("/api/auth/register")
////                        .allowedOrigins("http://localhost:3000")
////                        .allowedMethods("GET", "POST")
////                        .allowedHeaders("*")
////                        .allowCredentials(true);
////
////                registry.addMapping("/api/auth/login")
////                        .allowedOrigins("http://localhost:3000")
////                        .allowedMethods("GET", "POST")
////                        .allowedHeaders("*")
////                        .allowCredentials(true);
//            }
//        };
//    }
//}


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Adjust this based on your frontend's address
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}


