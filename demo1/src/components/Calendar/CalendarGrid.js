import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import CalendarEvent from "./CalendarEvent";
import "./Calendar.css";

const CalendarGrid = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [editEventId, setEditEventId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "CalendarEvents"));
            const eventsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(eventsData);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title || !description || !date || !time) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const eventCollection = collection(db, "CalendarEvents");

            if (editEventId) {
                // Update existing event
                const eventDoc = doc(db, "CalendarEvents", editEventId);
                await updateDoc(eventDoc, { title, description, date, time });
                setSuccess("Event updated successfully!");
                setEditEventId(null);
            } else {
                // Add new event
                await addDoc(eventCollection, { title, description, date, time });
                setSuccess("Event added successfully!");
            }

            // Clear form
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");

            fetchEvents();
        } catch (err) {
            console.error("Error saving event:", err);
            setError("Failed to save event. Please try again.");
        }
    };

    const handleEditEvent = (event) => {
        setEditEventId(event.id);
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date);
        setTime(event.time);
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const eventDoc = doc(db, "CalendarEvents", eventId);
            await deleteDoc(eventDoc);
            fetchEvents();
            setSuccess("Event deleted successfully!");
        } catch (err) {
            console.error("Error deleting event:", err);
            setError("Failed to delete event. Please try again.");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="calendar-grid-container">
            <form onSubmit={handleSubmit} className="event-form">
                <h1>{editEventId ? "Edit Event" : "Add Event"}</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type="submit">{editEventId ? "Update Event" : "Add Event"}</button>
            </form>
            <div className="calendar-events">
                <h2>Events</h2>
                {events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map((event) => (
                        <CalendarEvent
                            key={event.id}
                            event={event}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default CalendarGrid;
