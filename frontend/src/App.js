import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup'; // Correct
import StudyGroups from './components/StudyGroups';

const App = () => (
    <Router>
        <Routes>
            {/* Define each route and specify the element */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/study-groups" element={<StudyGroups />} />
        </Routes>
    </Router>
);

export default App;
