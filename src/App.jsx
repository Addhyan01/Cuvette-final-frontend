import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'


import './App.css';
import Login from './page/Login/Login';
import Register from './page/Register/Register';
import Dashboard from './page/Dashboard/Dashboard';
import Board from './Component/Board/Board';
import Setting from './Component/Setting/Setting';
import Nav from './Component/Nav/Nav';
import Analytics from './page/Analytics/Analytics';
import Shared from './page/SharedTaskPage/Shared';

import Settings from './page/setting/Settings';

function App() {
    const location = useLocation();
    const showNavbarAndSidebar = !['/login', '/register',"/"].includes(location.pathname);

  


  return (
    <div className='app'>
      <div className='content'>
        {showNavbarAndSidebar && <Nav />}
        
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/board" element={<Board />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/task/:token" element={<Shared />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    
      </div>
    </div>

    
  );
};

const AppWrapper = () => 
   (
    <Router>
      <App />
    </Router>
  )


export default AppWrapper
