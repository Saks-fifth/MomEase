import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to MomEase</h1>
                <p>Streamlining your daily life with ease and efficiency.</p>
            </header>

            <div className="home-navigation">
                <Link to="/calendar" className="home-card">
                    <h2>Calendar</h2>
                    <p>Plan your schedule and stay on top of your day.</p>
                </Link>

                <Link to="/tasks" className="home-card">
                    <h2>Tasks</h2>
                    <p>Keep track of and manage your daily tasks efficiently.</p>
                </Link>

                <Link to="/services" className="home-card">
                    <h2>Services</h2>
                    <p>Find and book services easily.</p>
                </Link>

                <Link to="/shopping-list" className="home-card">
                    <h2>Shopping List</h2>
                    <p>Organize and manage your shopping needs efficiently.</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;
