// src/components/StudyGroups.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudyGroups = () => {
    const [studyGroups, setStudyGroups] = useState([]);

    useEffect(() => {
        const fetchStudyGroups = async () => {
            const response = await fetch('http://localhost:5000/study_groups');
            const data = await response.json();
            setStudyGroups(data.study_groups);
        };

        fetchStudyGroups();
    }, []);

    return (
        <div>
            <h1>Study Groups</h1>
            <ul>
                {studyGroups.map(group => (
                    <li key={group.id}>
                        <strong>{group.name}</strong>: {group.description}
                    </li>
                ))}
            </ul>
            <Link to="/create-study-group">Create a new Study Group</Link>
        </div>
    );
};

export default StudyGroups;
