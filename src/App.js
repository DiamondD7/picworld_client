import React from 'react';
import Home from './components/Home';
import Profile from './components/Profile/Profile'
import { Routes, Route } from "react-router-dom";
import Nav from './components/Navigation/Nav';
import Message from './components/Message/Message';


const App = () => {
    return(
        <div className='main-container'>
            <nav className="nav-container">
                <Nav />
            </nav>     
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/message" element={<Message />} />
            </Routes>
        </div>
    );
};

export default App;