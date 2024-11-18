import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        is_tutor: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', form);
            alert(response.data.message);
        } catch (error) {
            alert("Error signing up!");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    className="form-control mb-3"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={form.is_tutor}
                        onChange={(e) => setForm({ ...form, is_tutor: e.target.checked })}
                    />
                    <label className="form-check-label">Are you a tutor?</label>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
