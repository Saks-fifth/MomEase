import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../config/firebase';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    addDoc,
} from 'firebase/firestore';
import ServiceItem from './ServiceItem';
import './ServiceList.css';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        name: '',
        provider: '',
        status: 'pending',
        date: '',
    });
    const [error, setError] = useState(null);

    const serviceCollection = collection(db, 'ServiceBooking');

    // Fetch services from Firestore
    const fetchServices = useCallback(async () => {
        try {
            const snapshot = await getDocs(serviceCollection);
            const fetchedServices = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(fetchedServices);
        } catch (error) {
            console.error('Error fetching services:', error);
            setError('Failed to load services.');
        }
    }, [serviceCollection]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleDelete = async (id) => {
        try {
            const docRef = doc(db, 'ServiceBooking', id);
            await deleteDoc(docRef);
            setServices(services.filter((service) => service.id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
            setError('Failed to delete the service.');
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const docRef = doc(db, 'ServiceBooking', id);
            await updateDoc(docRef, updatedData);
            fetchServices();
        } catch (error) {
            console.error('Error updating service:', error);
            setError('Failed to update the service.');
        }
    };

    const handleAddService = async () => {
        try {
            if (!newService.name || !newService.provider || !newService.date) {
                setError('Please fill in all the fields before adding a booking.');
                return;
            }
            await addDoc(serviceCollection, newService);
            setNewService({ name: '', provider: '', status: 'pending', date: '' });
            fetchServices();
        } catch (error) {
            console.error('Error adding service:', error);
            setError('Failed to add the new service.');
        }
    };

    return (
        <div className="service-list-container">
            <h1>Service Bookings</h1>
            <div className="new-service-form">
                <h2>Add New Booking</h2>
                <input
                    type="text"
                    placeholder="Service Name"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Provider"
                    value={newService.provider}
                    onChange={(e) => setNewService({ ...newService, provider: e.target.value })}
                />
                <input
                    type="datetime-local"
                    value={newService.date}
                    onChange={(e) => setNewService({ ...newService, date: e.target.value })}
                />
                <button onClick={handleAddService}>Add Booking</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="service-list">
                {services.map((service) => (
                    <ServiceItem
                        key={service.id}
                        service={service}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

export default ServiceList;