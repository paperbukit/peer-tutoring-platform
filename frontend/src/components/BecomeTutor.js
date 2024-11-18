// src/components/BecomeTutor.js
import React, { useState } from 'react';

const BecomeTutor = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can send this data to the backend to register the user as a tutor
        alert(`You are now a tutor for ${subject} with the description: ${description}`);
    };

    return (
        <div>
            <h1>Become a Tutor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Become a Tutor</button>
            </form>
        </div>
    );
};

export default BecomeTutor;
