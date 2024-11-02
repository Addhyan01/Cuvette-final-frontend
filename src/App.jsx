import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'


import './App.css';
import Login from './page/Login/Login';
import Register from './page/Register/Register';


import Nav from './Component/Nav/Sidebar';
import Analytics from './page/Analytics/Analytics';
import Shared from './page/SharedTaskPage/Shared';
import Dashboard from './page/Dashboard/Dashboard';
import Settings from './page/setting/Settings';
import TaskPage from './page/TaskPage/TaskPage';
import Sidebar from './Component/Nav/Sidebar';

function App() {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
  }, []);


    const showNavbarAndSidebar = !['/login', '/register','/'].includes(location.pathname);

  


  return (
    <div className='app'>
      <div className='content'>
        {showNavbarAndSidebar && isAuthenticated && <Sidebar />}
        
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskPage />} />
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
