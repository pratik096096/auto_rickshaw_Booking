package com.example.autorickshawbooking.Controller;
//
//import com.example.autorickshawbooking.entity.Booking;
//import com.example.autorickshawbooking.repository.BookingRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//
//import java.util.List;
//@RestController
//@RequestMapping("/api/bookings")
//public class BookingController {
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @PostMapping
//    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
//        Booking savedBooking = bookingRepository.save(booking);
//        return ResponseEntity.ok(savedBooking);
//    }

//    @GetMapping("/vehicle/{vehicleNumber}")
//    public ResponseEntity<List<Booking>> getBookingsByVehicleNumber(@PathVariable String vehicleNumber) {
//        List<Booking> bookings = bookingRepository.findByVehicleNumber(vehicleNumber);
//        return ResponseEntity.ok(bookings);
//    }

//@RestController
//@RequestMapping("/api/bookings")
//public class BookingController {
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @PostMapping
//    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
//        Booking savedBooking = bookingRepository.save(booking);
//        return ResponseEntity.ok(savedBooking);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Booking>> getAllBookings() {
//        List<Booking> bookings = bookingRepository.findAll();
//        return ResponseEntity.ok(bookings);
//    }
//}

import com.example.autorickshawbooking.entity.Booking;
import com.example.autorickshawbooking.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody BookingRequest bookingRequest) {
        boolean isBooked = bookingService.createBooking(bookingRequest);

        if (isBooked) {
            return ResponseEntity.ok("Booking confirmed");
        } else {
            return ResponseEntity.status(400).body("Booking failed");
        }
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Booking>> getBookingsByDriverId(@PathVariable Long driverId) {
        List<Booking> bookings = bookingService.getBookingsByDriverId(driverId);
        return ResponseEntity.ok(bookings);
    }
}

