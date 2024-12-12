package com.example.momease.demo1.service;

import com.example.momease.demo1.model.ShoppingList; // Import for the ShoppingList class
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ShoppingListService {
    private static final String COLLECTION_NAME = "ShoppingList";

    // Method to create a new shopping list
    public String createShoppingList(ShoppingList shoppingList) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(shoppingList.getObjectId()).set(shoppingList).get();
        return "Shopping list created with ID: " + shoppingList.getObjectId();
    }

    // Method to retrieve a shopping list by ID
    public ShoppingList getShoppingList(String listId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(listId).get().get().toObject(ShoppingList.class);
    }

    // Method to retrieve all shopping lists
    public List<ShoppingList> getAllShoppingLists() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        List<ShoppingList> shoppingLists = new ArrayList<>();

        QuerySnapshot snapshot = db.collection(COLLECTION_NAME).get().get();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            ShoppingList shoppingList = document.toObject(ShoppingList.class);
            shoppingLists.add(shoppingList);
        }
        return shoppingLists;
    }

    // Method to update a shopping list
    public String updateShoppingList(ShoppingList shoppingList) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(shoppingList.getObjectId()).set(shoppingList).get();
        return "Shopping list updated with ID: " + shoppingList.getObjectId();
    }

    // Method to delete a shopping list by ID
    public String deleteShoppingList(String listId) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(listId).delete();
        return "Shopping list deleted with ID: " + listId;
    }
}
