package com.example.momease.demo1.model;

import lombok.Data;
import java.util.List;

@Data
public class User {
    private String objectId;          // Unique ID for the user
    private String email;             // User's email address
    private String username;          // User's unique username
    private String password;          // Hashed password for authentication
    private String profileImage;      // User's profile image
    private List<String> familyProfiles; // Profiles of family members (children)
    private List<String> linkedAccounts; // Accounts linked to other services (e.g., calendar)
    private String preferences;       // User preferences, such as services and reminders
}
