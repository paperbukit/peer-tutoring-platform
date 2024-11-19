import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, email, password });
            navigate('/login'); // Redirect to login page
        } catch (error) {
            alert("Error signing up");
        }
    };

    return (
        <div className="signup-container">
            <div className="motivational-section">
                <div>
                    <p className="motivational-quote">“Your future is created by what you do today, not tomorrow.”</p>
                    <p className="motivational-author">- Robert Kiyosaki</p>
                </div>
            </div>
            
            <div className="signup-form-container">
                <h1 className="signup-header">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="cta-button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
