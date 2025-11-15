import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './account/Login';
// import Register from './account/Register';
import MainLayout from './MainLayout';
import Content from './component/Content';
import Money from './component/Money';
import Chat from './component/Chat';
import Chatbot from './component/Chatbot';


const App = () => {
  return (
    <Router>
      <Routes>

        {/* <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}


        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Content />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/money" element={<Money />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;