package com.example.momease.demo1.service;

import com.example.momease.demo1.model.User;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    private static final String COLLECTION_NAME = "User";

    // Create a new user
    public String createUser(User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(user.getObjectId()).set(user).get();
        return "User created with ID: " + user.getObjectId();
    }

    // Get a user by ID
    public User getUser(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(userId).get().get().toObject(User.class);
    }

    // Update an existing user
    public String updateUser(User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(user.getObjectId()).set(user).get();
        return "User updated with ID: " + user.getObjectId();
    }

    // Delete a user by ID
    public String deleteUser(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(userId).delete().get();
        return "User deleted with ID: " + userId;
    }
}
