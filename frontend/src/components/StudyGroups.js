// components/StudyGroups.js
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

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Use 12-hour format
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
    };

    return (
        <div>
            <h1>Study Groups</h1>
            <ul>
                {studyGroups.map(group => (
                    <li key={group.id}>
                        <strong>{group.name}</strong>: {group.description}
                        <div>Subject: {group.subject}</div>
                        <div>Topic: {group.topic}</div>
                        <div>Max Students: {group.max_students}</div>
                        <div>Scheduled Time: {formatDateTime(group.scheduled_time)}</div>
                    </li>
                ))}
            </ul>
            <Link to="/create-study-group">Create a new Study Group</Link>
        </div>
    );
};

export default StudyGroups; // Ensure this is present
