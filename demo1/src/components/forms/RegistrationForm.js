import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { db } from '../../config/firebase'; // Ensure correct Firebase configuration import
import { collection, addDoc } from 'firebase/firestore';
import './RegistrationForm.css'; // Import your CSS file

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        console.log('Attempting to add user to Firestore...');

        try {
            const userCollection = collection(db, 'User'); // Reference the 'User' collection in Firestore

            await addDoc(userCollection, {
                username,
                email,
                password, // Store the password (you may want to hash this for security in a real application)
            });

            setSuccess('User registered successfully!');
            console.log('User added successfully:', { username, email });

            // Clear the form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Redirect to the login page after 2 seconds
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            console.error('Firestore Error:', err);
            setError('Failed to register user. Please try again.');
        }
    };

    return (
        <div className="registration-form-container">
            <form onSubmit={handleSubmit} className="registration-form">
                <h1>Register</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
