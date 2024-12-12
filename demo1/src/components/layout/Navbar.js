import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); // Use the useNavigate hook for programmatic navigation

    const handleLogout = () => {
        // Clear user session or token
        localStorage.removeItem('userToken');
        // Redirect to login page
        navigate('/'); // Navigate to the login page
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.logo}>MomEase</h1>
            <ul style={styles.navLinks}>
                <li><Link to="/home" style={styles.link}>Home</Link></li>
                <li><Link to="/calendar" style={styles.link}>Calendar</Link></li>
                <li><Link to="/tasks" style={styles.link}>Tasks</Link></li>
                <li><Link to="/services" style={styles.link}>Services</Link></li>
                <li><Link to="/shopping-list" style={styles.link}>Shopping List</Link></li>
                <li>
                    <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

// Define styles for the Navbar
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Green background
        padding: '10px 20px',
    },
    logo: {
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        margin: '0 15px',
        fontSize: '16px',
    },
    logoutButton: {
        backgroundColor: '#f44336', // Red background
        color: '#fff',
        border: 'none',
        padding: '8px 15px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginLeft: '15px',
    },
};

export default Navbar;
