package com.example.momease.demo1.controller;

import com.example.momease.demo1.model.ServiceBooking;
import com.example.momease.demo1.service.ServiceBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/serviceBookings")
public class ServiceBookingController {

    @Autowired
    private ServiceBookingService serviceBookingService;

    // Endpoint to create a new service booking
    @PostMapping("/create")
    public String createServiceBooking(@RequestBody ServiceBooking booking) throws ExecutionException, InterruptedException {
        return serviceBookingService.createServiceBooking(booking);
    }

    // Endpoint to retrieve a service booking by ID
    @GetMapping("/{id}")
    public ServiceBooking getServiceBooking(@PathVariable("id") String bookingId) throws ExecutionException, InterruptedException {
        return serviceBookingService.getServiceBooking(bookingId);
    }

    // Endpoint to retrieve all service bookings
    @GetMapping
    public ResponseEntity<List<ServiceBooking>> getAllServiceBookings() throws ExecutionException, InterruptedException {
        List<ServiceBooking> bookings = serviceBookingService.getAllServiceBookings();
        return ResponseEntity.ok(bookings);
    }

    // Endpoint to update a service booking by ID
    @PutMapping("/{id}")
    public String updateServiceBooking(@PathVariable("id") String bookingId, @RequestBody ServiceBooking booking) throws ExecutionException, InterruptedException {
        booking.setObjectId(bookingId); // Set the ID in the booking object if necessary
        return serviceBookingService.updateServiceBooking(booking);
    }

    // Endpoint to delete a service booking by ID
    @DeleteMapping("/delete/{id}")
    public String deleteServiceBooking(@PathVariable("id") String bookingId) {
        return serviceBookingService.deleteServiceBooking(bookingId);
    }
}
