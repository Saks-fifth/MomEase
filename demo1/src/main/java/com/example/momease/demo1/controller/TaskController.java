package com.example.momease.demo1.controller;

import com.example.momease.demo1.model.Task;
import com.example.momease.demo1.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Endpoint to create a new task
    @PostMapping("/create")
    public String createTask(@RequestBody Task task) throws ExecutionException, InterruptedException {
        return taskService.createTask(task);
    }

    // Endpoint to retrieve a task by ID
    @GetMapping("/{id}")
    public Task getTask(@PathVariable("id") String taskId) throws ExecutionException, InterruptedException {
        return taskService.getTask(taskId);
    }

    // Endpoint to update a task
    @PutMapping("/update")
    public String updateTask(@RequestBody Task task) throws ExecutionException, InterruptedException {
        return taskService.updateTask(task);
    }

    // Endpoint to delete a task by ID
    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable("id") String taskId) {
        return taskService.deleteTask(taskId);
    }
}
