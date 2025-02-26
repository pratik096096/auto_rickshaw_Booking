package com.example.autorickshawbooking.services;

import com.example.autorickshawbooking.Controller.BookingRequest;
import com.example.autorickshawbooking.entity.Booking;

import java.util.List;

public interface BookingService {
    boolean createBooking(BookingRequest bookingRequest);
    List<Booking> getBookingsByDriverId(Long driverId);
}
