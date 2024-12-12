import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>
                MomEase © 2024 | <a href="/privacy" style={styles.link}>Privacy Policy</a> | <a href="/terms" style={styles.link}>Terms of Service</a>
            </p>
        </footer>
    );
};

// Define styles for the Footer
const styles = {
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Dark background
        color: '#fff', // White text
        padding: '10px 20px',
        position: 'fixed', // Sticks the footer to the bottom
        bottom: 0,
        width: '100%',
    },
    text: {
        margin: 0,
        fontSize: '14px',
    },
    link: {
        color: '#4CAF50', // Green color for links
        textDecoration: 'none',
        margin: '0 5px',
    },
};

// Export the Footer component
export default Footer;
