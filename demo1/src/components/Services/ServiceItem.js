import React, { useState } from 'react';
import './ServiceItem.css';

const ServiceItem = ({ service, onDelete, onUpdate }) => {
    const { id, serviceProvider, serviceType, status, date } = service;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(status);

    // Convert Firebase Timestamp to a readable string
    const formattedDate = date?.toDate ? date.toDate().toLocaleString() : date;

    const handleUpdate = () => {
        onUpdate(id, { status: updatedStatus });
        setIsEditing(false);
    };

    return (
        <div className="service-item">
            <h3>{serviceType}</h3>
            <p>Provider: {serviceProvider}</p>
            <p>Status: {status}</p>
            <p>Date: {formattedDate}</p>

            {isEditing ? (
                <div>
                    <select
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                    >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ServiceItem;
