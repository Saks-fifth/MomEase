package com.example.momease.demo1.controller;

import com.example.momease.demo1.model.ShoppingList;
import com.example.momease.demo1.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/shoppingLists")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    // Endpoint to create a new shopping list
    @PostMapping("/create")
    public ResponseEntity<String> createShoppingList(@RequestBody ShoppingList shoppingList) throws ExecutionException, InterruptedException {
        String response = shoppingListService.createShoppingList(shoppingList);
        return ResponseEntity.ok(response);
    }

    // Endpoint to retrieve a shopping list by ID
    @GetMapping("/{id}")
    public ResponseEntity<ShoppingList> getShoppingList(@PathVariable("id") String listId) throws ExecutionException, InterruptedException {
        ShoppingList shoppingList = shoppingListService.getShoppingList(listId);
        return ResponseEntity.ok(shoppingList);
    }

    // Endpoint to retrieve all shopping lists
    @GetMapping
    public ResponseEntity<List<ShoppingList>> getAllShoppingLists() throws ExecutionException, InterruptedException {
        List<ShoppingList> shoppingLists = shoppingListService.getAllShoppingLists();
        return ResponseEntity.ok(shoppingLists);
    }

    // Endpoint to update a shopping list by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateShoppingList(@PathVariable("id") String listId, @RequestBody ShoppingList shoppingList) throws ExecutionException, InterruptedException {
        shoppingList.setObjectId(listId); // Ensure the objectId is set correctly
        String response = shoppingListService.updateShoppingList(shoppingList);
        return ResponseEntity.ok(response);
    }

    // Endpoint to delete a shopping list by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteShoppingList(@PathVariable("id") String listId) {
        String response = shoppingListService.deleteShoppingList(listId);
        return ResponseEntity.ok(response);
    }
}
