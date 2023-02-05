import React, {useState} from 'react';
import Home from './components/Home';
import Profile from './components/Profile/Profile'
import { Routes, Route } from "react-router-dom";
import Nav from './components/Navigation/Nav';
import Message from './components/Message/Message';
import Signup from './components/Signup/Signup';


const App = () => {
    const [authorized, setAuthorized] = useState(false);
    const [loggedUser, setLoggedUser] = useState([]);
    return(
        <>
            {authorized ? 
            <div className='main-container'>
                <nav className="nav-container">
                    <Nav />
                </nav>     
                <Routes>
                    <Route path="/" element={<Home loggedUser={loggedUser}/>} />
                    <Route path="/profile" element={<Profile loggedUser={loggedUser}/>} />
                    <Route path="/message" element={<Message loggedUser={loggedUser}/>} />
                </Routes>
            </div>
            : <Signup auth={setAuthorized} loggedUser={setLoggedUser}/>}
        </>
    );
};

export default App;