import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import StudyGroups from './components/StudyGroups';

const App = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/study-groups" element={<StudyGroups />} />
            </Routes>
        </div>
    </Router>
);

export default App;
