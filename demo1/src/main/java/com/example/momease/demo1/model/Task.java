package com.example.momease.demo1.model;

import lombok.Data;
import java.util.Date;

@Data
public class Task {
    private String objectId;
    private String title;
    private String description;
    private Date dueDate;
    private boolean isCompleted;
    private String priority;
}
