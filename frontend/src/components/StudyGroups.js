import React, { useEffect, useState } from 'react';
import { getStudyGroups } from '../services/api';

const StudyGroups = () => {
    const [studyGroups, setStudyGroups] = useState([]);

    useEffect(() => {
        const fetchStudyGroups = async () => {
            const groups = await getStudyGroups();
            setStudyGroups(groups);
        };
        fetchStudyGroups();
    }, []);

    return (
        <div>
            <h1>Study Groups</h1>
            <ul>
                {studyGroups.map(group => (
                    <li key={group.id}>{group.name}: {group.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudyGroups;
