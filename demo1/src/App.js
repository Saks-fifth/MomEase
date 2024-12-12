import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; // Ensure Navbar is implemented
import Footer from './components/layout/Footer'; // Ensure Footer is implemented
import LoginForm from './components/forms/LoginForm'; // Login page
import Home from './components/forms/Home'; // Corrected path to Home.js
import CalendarGrid from './components/Calendar/CalendarGrid'; // Calendar page
import TaskForm from './components/forms/TaskForm'; // Task management
import ServiceList from './components/Services/ServiceList'; // Service booking
import RegistrationForm from './components/forms/RegistrationForm'; // Registration form
import ShoppingList from './components/forms/ShoppingList'; // Shopping List component
import Profile from './components/forms/Profile'; // Profile component

const App = () => {
    const location = useLocation(); // Hook to get the current route

    const hideNavbarRoutes = ['/', '/register']; // Define routes where Navbar should not appear

    return (
        <div>
            {/* Conditionally render Navbar */}
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

            <div style={{ minHeight: 'calc(100vh - 100px)', padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<LoginForm />} /> {/* Login page */}
                    <Route path="/register" element={<RegistrationForm />} /> {/* Registration page */}
                    <Route path="/home" element={<Home />} /> {/* Home page */}
                    <Route path="/calendar" element={<CalendarGrid />} /> {/* Calendar */}
                    <Route path="/tasks" element={<TaskForm />} /> {/* Tasks */}
                    <Route path="/services" element={<ServiceList />} /> {/* Services */}
                    <Route path="/shopping-list" element={<ShoppingList />} /> {/* Shopping List */}
                    <Route path="/profile" element={<Profile />} /> {/* Profile */}
                </Routes>
            </div>

            {/* Footer for all pages */}
            <Footer />
        </div>
    );
};

// Wrap App component in Router
const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
