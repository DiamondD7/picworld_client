import React, {useEffect, useState} from 'react';
import Home from './components/Home';
import Profile from './components/Profile/Profile'
import { Routes, Route } from "react-router-dom";
import Nav from './components/Navigation/Nav';
import Message from './components/Message/Message';
import Signup from './components/Signup/Signup';


const App = () => {
    const [authorized, setAuthorized] = useState(false);
    const [loggedUser, setLoggedUser] = useState([]);
    const [authUserId, setAuthUserId] = useState('');

    useEffect(() => {
        const authenticated = localStorage.getItem("authorized");
        if(authenticated === "true"){
            setAuthorized(true);
        }
    },[])

    const setAuth = (value, data) => {
        setAuthorized(value);
        localStorage.setItem("authorized", "true");
        localStorage.setItem("data", JSON.stringify(data));
    }

    // useEffect(() => {
    //     localStorage.setItem("data", JSON.stringify(loggedUser));
    // },[loggedUser])
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
            : <Signup auth={setAuth} loggedUser={setLoggedUser}/>}
        </>
    );
};

export default App;