import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Peer Tutoring Platform</h1>
            <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;
