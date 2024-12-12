import React from "react";
import "./Calendar.css";

const CalendarEvent = ({ event, onEdit, onDelete }) => {
    return (
        <div className="calendar-event">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
                <strong>Time:</strong> {event.time}
            </p>
            <div className="event-actions">
                <button onClick={() => onEdit(event)} className="edit-event-button">
                    Edit
                </button>
                <button onClick={() => onDelete(event.id)} className="delete-event-button">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CalendarEvent;
