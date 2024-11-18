import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="container mt-5">
        <h1>Welcome to the Peer Tutoring Platform</h1>
        <p>Find study groups or sign up to become a tutor or tutee!</p>
        <div>
            <Link to="/signup" className="btn btn-primary m-2">Signup</Link>
            <Link to="/study-groups" className="btn btn-success m-2">Study Groups</Link>
        </div>
    </div>
);

export default Home;
