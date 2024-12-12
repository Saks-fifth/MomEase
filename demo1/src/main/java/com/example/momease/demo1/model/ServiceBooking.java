package com.example.momease.demo1.model;

import lombok.Data;
import java.util.Date;

@Data
public class ServiceBooking {
    private String objectId;            // Unique ID for the service booking
    private Date date;                  // Date of the booking
    private String serviceProvider;     // Name of the service provider
    private String serviceType;         // Type of service booked (e.g., cleaning, childcare)
    private String status;              // Status of the booking (e.g., confirmed, pending)
}
