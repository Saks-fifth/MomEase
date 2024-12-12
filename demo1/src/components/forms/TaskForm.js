import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import "./TaskForm.css";

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Low");
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editTaskId, setEditTaskId] = useState(null); // Track which task is being edited

    const fetchTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Task"));
            const tasksData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(tasksData);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title || !description || !dueDate) {
            setError("Please fill out all required fields.");
            return;
        }

        try {
            const taskCollection = collection(db, "Task");

            if (editTaskId) {
                // Update existing task
                const taskDoc = doc(db, "Task", editTaskId);
                await updateDoc(taskDoc, {
                    title,
                    description,
                    dueDate: new Date(dueDate),
                    priority,
                });
                setSuccess("Task updated successfully!");
                setEditTaskId(null); // Exit edit mode
            } else {
                // Add new task
                await addDoc(taskCollection, {
                    title,
                    description,
                    dueDate: new Date(dueDate),
                    priority,
                    isCompleted: false,
                });
                setSuccess("Task added successfully!");
            }

            // Clear form fields
            setTitle("");
            setDescription("");
            setDueDate("");
            setPriority("Low");
            fetchTasks(); // Refresh task list
        } catch (err) {
            console.error("Error adding/updating task:", err);
            setError("Failed to save task. Please try again.");
        }
    };

    const handleToggleTaskStatus = async (taskId, currentStatus) => {
        try {
            const taskDoc = doc(db, "Task", taskId);
            await updateDoc(taskDoc, { isCompleted: !currentStatus });
            fetchTasks(); // Refresh task list
        } catch (err) {
            console.error("Error updating task status:", err);
            setError("Failed to update task. Please try again.");
        }
    };

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(
            task.dueDate?.toDate
                ? task.dueDate.toDate().toISOString().split("T")[0]
                : ""
        );
        setPriority(task.priority);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const taskDoc = doc(db, "Task", taskId);
            await deleteDoc(taskDoc);
            fetchTasks(); // Refresh the task list
            setSuccess("Task deleted successfully!");
        } catch (err) {
            console.error("Error deleting task:", err);
            setError("Failed to delete task. Please try again.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-form-container">
            <form onSubmit={handleSubmit} className="task-form">
                <h1>{editTaskId ? "Edit Task" : "Create Task"}</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <input
                    type="text"
                    placeholder="Task Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit">{editTaskId ? "Update Task" : "Add Task"}</button>
            </form>
            <div className="task-list">
                <h2>Task List</h2>
                {tasks.length === 0 ? (
                    <p>No tasks available.</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>
                                Due Date:{" "}
                                {task.dueDate?.toDate
                                    ? task.dueDate.toDate().toLocaleDateString()
                                    : "N/A"}
                            </p>
                            <p>Priority: {task.priority}</p>
                            <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
                            <button
                                onClick={() =>
                                    handleToggleTaskStatus(task.id, task.isCompleted)
                                }
                                className={
                                    task.isCompleted
                                        ? "incomplete-task-button"
                                        : "complete-task-button"
                                }
                            >
                                {task.isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                            </button>
                            <button
                                onClick={() => handleEditTask(task)}
                                className="edit-task-button"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="delete-task-button"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskForm;
