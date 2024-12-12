package com.example.momease.demo1.model;

import lombok.Data;
import java.util.List;

@Data
public class ShoppingList {
    private String objectId;       // Unique ID for the shopping list
    private boolean isShared;      // Whether the shopping list is shared
    private List<String> items;    // List of items added to the shopping list
}
