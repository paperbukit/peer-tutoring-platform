// src/components/CreateStudyGroup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStudyGroup = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/study_groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });
            navigate('/study-groups');
        } catch (error) {
            alert('Error creating study group');
        }
    };

    return (
        <div>
            <h1>Create a Study Group</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Study Group Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Study Group</button>
            </form>
        </div>
    );
};

export default CreateStudyGroup;
