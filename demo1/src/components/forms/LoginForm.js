import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { db } from '../../config/firebase'; // Correct import for firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import './LoginForm.css'; // Import the CSS file

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            // Query Firestore for the user
            const userCollection = collection(db, 'User');
            const userQuery = query(userCollection, where('email', '==', email));
            const querySnapshot = await getDocs(userQuery);

            // Check if user exists
            if (querySnapshot.empty) {
                setError('User not found. Please check your email.');
                return;
            }

            // Validate password
            const userData = querySnapshot.docs[0].data();
            if (userData.password !== password) {
                setError('Invalid password. Please try again.');
                return;
            }

            // Successful login
            console.log('Login successful:', userData);
            alert(`Welcome, ${userData.username}!`);

            // Redirect to the homepage
            navigate('/home');
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Navigate to the registration page
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            {/* MomEase Header */}
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#007BFF', marginBottom: '20px' }}>
                MomEase
            </h1>

            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: '10px',
                        padding: '10px',
                        fontSize: '16px',
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: '10px',
                        padding: '10px',
                        fontSize: '16px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
                Don't have an account?{' '}
                <button
                    onClick={handleRegisterRedirect}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#007BFF',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '0',
                    }}
                >
                    Register here
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
