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
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subject</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Topic</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Scheduled Time</th>
            </tr>
        </thead>
        <tbody>
            {studyGroups.map(group => (
                <tr key={group.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>{group.name}</strong></td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{group.description}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{group.subject}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{group.topic}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatDateTime(group.scheduled_time)}</td>
                </tr>
            ))}
        </tbody>
    </table>
            <Link to="/create-study-group">Create a new Study Group</Link>
        </div>
    );
};

export default StudyGroups; // Ensure this is present

// print("hello")