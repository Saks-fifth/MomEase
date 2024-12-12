package com.example.momease.demo1.service;

import com.example.momease.demo1.model.ServiceBooking; // Import for the ServiceBooking class
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ServiceBookingService {
    private static final String COLLECTION_NAME = "ServiceBooking";

    // Method to create a new service booking
    public String createServiceBooking(ServiceBooking booking) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(booking.getObjectId()).set(booking).get();
        return "Service booking created with ID: " + booking.getObjectId();
    }

    // Method to get a service booking by ID
    public ServiceBooking getServiceBooking(String bookingId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(bookingId).get().get().toObject(ServiceBooking.class);
    }

    // Method to get all service bookings
    public List<ServiceBooking> getAllServiceBookings() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        List<ServiceBooking> bookings = new ArrayList<>();

        QuerySnapshot snapshot = db.collection(COLLECTION_NAME).get().get();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            ServiceBooking booking = document.toObject(ServiceBooking.class);
            bookings.add(booking);
        }
        return bookings;
    }

    // Method to update a service booking
    public String updateServiceBooking(ServiceBooking booking) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(booking.getObjectId()).set(booking).get();
        return "Service booking updated with ID: " + booking.getObjectId();
    }

    // Method to delete a service booking by ID
    public String deleteServiceBooking(String bookingId) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(bookingId).delete();
        return "Service booking deleted with ID: " + bookingId;
    }
}
