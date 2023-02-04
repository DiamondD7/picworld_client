import React, {useState} from 'react';
import Home from './components/Home';
import Profile from './components/Profile/Profile'
import { Routes, Route } from "react-router-dom";
import Nav from './components/Navigation/Nav';
import Message from './components/Message/Message';
import Signup from './components/Signup/Signup';


const App = () => {
    const [authorized, setAuthorized] = useState(false);
    return(
        <>
            {authorized ? 
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
            : <Signup auth={setAuthorized}/>}
        </>
    );
};

export default App;