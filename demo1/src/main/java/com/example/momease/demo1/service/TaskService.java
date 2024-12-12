package com.example.momease.demo1.service;

import com.example.momease.demo1.model.Task;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class TaskService {
    private static final String COLLECTION_NAME = "Task";

    public String createTask(Task task) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(task.getObjectId()).set(task).get();
        return "Task created with ID: " + task.getObjectId();
    }

    public Task getTask(String taskId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(taskId).get().get().toObject(Task.class);
    }

    public String updateTask(Task task) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(task.getObjectId()).set(task).get();
        return "Task updated with ID: " + task.getObjectId();
    }

    public String deleteTask(String taskId) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(taskId).delete();
        return "Task deleted with ID: " + taskId;
    }
}
