import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../api/Api';
import { updateUserDetails } from '../../api/Api';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { logout } from '../../utlis/auth';
import NameIcon from '../../assets/Profile.png'; // Import SVG file for Name
import EmailIcon from '../../assets/emailSVG.svg'; // Import SVG file for Email
import PasswordIcon from '../../assets/lock.svg'; // Import SVG file for Password
import EyeIcon from '../../assets/eye.svg'; // Import SVG file for Eye Icon
import EyeOffIcon from '../../assets/eye.svg'; // Import SVG file for Eye Off Icon
import "./Settings.css";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data } = await getUserDetails();
      setUser(data);
      

    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails({ ...user, oldPassword, newPassword });
      alert('User details successfully update!');
      navigate('/login');
      
      
      logout();
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={handleUpdate}>
        <div className="input-container">
          <img src={NameIcon} alt="Person Icon" className="input-icon" />
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
            className="input-with-icon"
          />
        </div>
        <div className="input-container">
          <img src={EmailIcon} alt="Email Icon" className="input-icon" />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="input-with-icon"
          />
        </div>
        <div className="input-container">
          <img src={PasswordIcon} alt="Password Icon" className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            className="input-with-icon"
          />
          <img
            src={showPassword ? EyeOffIcon : EyeIcon}
            alt="Password Toggle"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="input-container">
          <img src={PasswordIcon} alt="Password Icon" className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="input-with-icon"
          />
          <img
            src={showPassword ? EyeOffIcon : EyeIcon}
            alt="Password Toggle"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button type="submit" className="update-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default Settings;
