import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null); // Holds user profile data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const currentUser = auth.currentUser; // Get the currently logged-in user
                if (currentUser) {
                    const userRef = doc(db, 'users', currentUser.uid); // Assuming 'users' is your Firestore collection
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        setUser(userDoc.data()); // Set user profile data
                    } else {
                        setError('User profile not found.');
                    }
                } else {
                    setError('No user is logged in.');
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to fetch user profile.');
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>; // Display a loading spinner
    }

    if (error) {
        return <div className="error">{error}</div>; // Display an error message
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {user ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name || 'Not available'}</p>
                    <p><strong>Email:</strong> {user.email || 'Not available'}</p>
                    <p><strong>Phone:</strong> {user.phone || 'Not available'}</p>
                    {/* Add more fields as needed */}
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default Profile;
