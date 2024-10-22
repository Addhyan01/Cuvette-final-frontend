import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import './App.css';
import Login from './page/Login/Login';
import Register from './page/Register/Register';
import Dashboard from './page/Dashboard/Dashboard';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
