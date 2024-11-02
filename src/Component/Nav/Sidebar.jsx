import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../utlis/auth';
import './Sidebar.css';

import { useNavigate } from 'react-router-dom';

import logoSVG from '../../assets/logo.png';
import layout from '../../assets/layout.png';
import database from '../../assets/database.png';
import settings from '../../assets/settings.png';
import logouts from '../../assets/Logout.png';



const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logoSVG} alt="Logo" className="sidebar-logo" />
        Pro Manage
      </div>
      <div className="sidebar-links">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          <img src={layout} alt="Dashboard Icon" className="sidebar-icon" />
          Board
        </Link>
        <Link to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>
          <img src={database} alt="Analytics Icon" className="sidebar-icon" />
          Analytics
        </Link>
        <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <img src={settings} alt="Settings Icon" className="sidebar-icon" />
          Settings
        </Link>
      </div>
      <div className="logout-button">
        <button onClick={handleLogout} className="logout-btn">
          <img img src={logouts} alt="Logout Icon" className="sidebar-icon" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
