package com.example.momease.demo1.controller;

import com.example.momease.demo1.model.User;
import com.example.momease.demo1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to create a new user
    @PostMapping("/create")
    public String createUser(@RequestBody User user) throws ExecutionException, InterruptedException {
        return userService.createUser(user);
    }

    // Endpoint to retrieve a user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") String userId) throws ExecutionException, InterruptedException {
        return userService.getUser(userId);
    }

    // Endpoint to update a user
    @PutMapping("/update")
    public String updateUser(@RequestBody User user) throws ExecutionException, InterruptedException {
        return userService.updateUser(user);
    }

    // Endpoint to delete a user by ID
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") String userId) throws ExecutionException, InterruptedException {
        return userService.deleteUser(userId);
    }
}
