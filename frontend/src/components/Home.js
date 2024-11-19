import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bannerImage from './images/banner.jpg'; // Add a banner image to the images folder
import collegeLogo from './images/college-logo.png'; // Add your college logo here

const Home = () => {
    return (
        <div className="home-container">
            <div className="banner">
                <img src={bannerImage} alt="Banner" className="banner-image" />
                <img src={collegeLogo} alt="College Logo" className="college-logo" />
                <h1 className="welcome-text">Welcome to the Peer Learning Platform</h1>
                <p className="subtitle">Connect, Collaborate, and Learn Together!</p>
            </div>
            
            <div className="info-section">
                <p>
                    Our platform helps students find study partners, form study groups, and collaborate for better learning. Whether you need help with tough subjects or just a study buddy, we’ve got you covered!
                </p>
                <div className="features">
                    <div className="feature">
                        <h3>🧑‍🤝‍🧑 Find Study Buddies</h3>
                        <p>Search and connect with peers who share similar academic interests and goals.</p>
                    </div>
                    <div className="feature">
                        <h3>📚 Create Study Groups</h3>
                        <p>Form groups to study together, share resources, and keep each other motivated.</p>
                    </div>
                    <div className="feature">
                        <h3>🎓 Access Career Resources</h3>
                        <p>Explore career paths, find resources, and get guidance to reach your career goals.</p>
                    </div>
                    <div className="feature">
                        <h3>💬 Real-time Collaboration</h3>
                        <p>Collaborate in real-time with chat, whiteboard, and scheduling tools.</p>
                    </div>
                </div>
                <p>Sign up today to start your learning journey with us!</p>
            </div>

            <div className="cta-section">
                <Link to="/signup" className="cta-button">Sign Up</Link>
                <Link to="/login" className="cta-button">Login</Link>
            </div>
        </div>
    );
};

export default Home;