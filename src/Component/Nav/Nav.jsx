import React from 'react'
// import style from './Nav.module.css'
import './Nav.css'
import { BrowserRouter, Link, NavLink, Route, useLocation, useNavigate } from 'react-router-dom'

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
              <>
                <div className="sidebar">
                      <div className="sidebar-header">
                        <img src="../logo.png" alt="Art" className="sidebar-logo" />
                        <p>Pro Manage</p>
                      </div>

                      <div className="sidebar-links">
                        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                          <img src="../layout.png" alt="Dashboard Icon" className="sidebar-icon" /> Board
                        </Link>
                      

                      
                        <Link to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>
                          <img src="../database.png" alt="Dashboard Icon" className="sidebar-icon" /> Analytics
                        </Link>
                     

                     
                        <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
                          <img src="../settings.png" alt="Dashboard Icon" className="sidebar-icon" /> Setting
                        </Link>
                      </div>


                      <div className="logout-button">
                        <button onClick={handleLogout} className="logout-btn">
                        <img src="../Logout.png" alt="Dashboard Icon" className="sidebar-icon" />
                          Logout
                        </button>
                      </div>





                </div>









                {/* <div className={style.sidebar}>
                      <div className={style.logo}>
                          <img src="../logo.png" alt="Art" />
                          <p>Pro Manage</p>  
                          
                          </div>
                      <NavLink className={style.navLink} to={"/board"} > <img src="../layout.png" alt="home" />  <p>Board</p> </NavLink>
                      <NavLink className={style.navLink} to={"/analytics"}> <img src="../database.png" alt="home" /><p>Analytics</p> </NavLink>
                      <NavLink className={style.navLink} to={"/settings"}> <img src="../settings.png" alt="home" /><p>Settings</p> </NavLink>
                      
                  </div> */}




              </>
  )
}
