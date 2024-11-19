import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ email, password });
            navigate('/home');
        } catch (error) {
            alert("Error logging in");
        }
    };

    return (
        <div className="login-container">
            <div className="quote-section">
                <h1 className="quote-text">
                    "The only way to do great work is to love what you do.
                    If you haven't found it yet, keep looking. 
                    Don't settle."
                </h1>
                <p className="quote-author">— Steve Jobs</p>
            </div>
            <div className="form-section">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
