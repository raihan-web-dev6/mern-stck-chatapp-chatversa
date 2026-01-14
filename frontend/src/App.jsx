import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';

import getCurrentUser from './customHooks/getCurrentUser';
import getOtherUsers from './customHooks/getotheruser';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { serverURL } from './main.jsx';
import { setOnlineUsers, setSocket } from './redux/userSlice.js';

function App() {
  getCurrentUser();
  getOtherUsers();

  const { userData, socket, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();
 useEffect(() => {
  if (!userData?._id) return;

  const socketio = io(serverURL, {
    query: { userId: userData._id }
  });

  dispatch(setSocket(socketio));

  socketio.on("getonlineuser", (users) => {
    dispatch(setOnlineUsers(users));
  });

  return () => {
    socketio.disconnect();
    dispatch(setSocket(null));
  };
}, [userData?._id]);




  return (
    <Routes>
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/profile" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  );
}

export default App;
