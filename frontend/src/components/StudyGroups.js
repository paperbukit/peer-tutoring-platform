import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudyGroups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch study groups from the backend
        axios.get('http://127.0.0.1:5000/study-groups')
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the study groups!", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2>Study Groups</h2>
            <ul className="list-group">
                {groups.map(group => (
                    <li key={group.id} className="list-group-item">
                        <strong>{group.subject}</strong> - Members: {group.members.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudyGroups;
