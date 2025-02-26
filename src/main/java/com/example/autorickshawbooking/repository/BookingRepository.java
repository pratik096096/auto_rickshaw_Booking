package com.example.autorickshawbooking.repository;

//import com.example.autorickshawbooking.entity.Booking;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//import java.util.List;
//
//public interface BookingRepository extends MongoRepository<Booking, String> {
//    List<Booking> findByVehicleNumber(String vehicleNumber);
//}


import com.example.autorickshawbooking.entity.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByDriverId(Long driverId);
}

