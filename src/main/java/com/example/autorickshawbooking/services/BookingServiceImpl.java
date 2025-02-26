package com.example.autorickshawbooking.services;

import com.example.autorickshawbooking.Controller.BookingRequest;
import com.example.autorickshawbooking.entity.Booking;
import com.example.autorickshawbooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public boolean createBooking(BookingRequest bookingRequest) {
        Booking booking = new Booking();
        booking.setAutoName(bookingRequest.getAutoName());
        booking.setVehicleNumber(bookingRequest.getVehicleNumber());
        booking.setAutoType(bookingRequest.getAutoType());
        booking.setAvailable(bookingRequest.isAvailable());
        booking.setCurrentLocation(bookingRequest.getCurrentLocation());
        booking.setDestination(bookingRequest.getDestination());
        booking.setPhoneNumber(bookingRequest.getPhoneNumber());
        booking.setDriverId(bookingRequest.getDriverId());

        bookingRepository.save(booking);
        return true;
    }

    @Override
    public List<Booking> getBookingsByDriverId(Long driverId) {
        return bookingRepository.findByDriverId(driverId);
    }
}
