import React, { useState, useEffect } from 'react';

import { getUserDetails } from '../../api/Api';
import { updateUserDetails } from '../../api/Api';
import './Dashboard.css';
import TaskPage from '../TaskPage/TaskPage';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', addedEmails: [] });
  const [showAddPeoplePopup, setShowAddPeoplePopup] = useState(false);
  const [newPersonEmail, setNewPersonEmail] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [emails, setEmails] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUserDetails();
    setCurrentDate(getFormattedDate(new Date())); // Initialize current date
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data } = await getUserDetails();
      setUser(data);
      setEmails(data.addedEmails || []); // Initialize emails from user data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleAddPeople = () => {
    setShowAddPeoplePopup(true);
  };

  const handleCancel = () => {
    setShowAddPeoplePopup(false);
    setNewPersonEmail('');
    setSuccessMessage('');
  };

  const handleAddEmail = async () => {
    try {
      const updatedUser = { ...user, addedEmails: [...user.addedEmails, newPersonEmail] };
      await updateUserDetails(updatedUser);
      setEmails([...user.addedEmails, newPersonEmail]); // Update state with new email
      setShowAddPeoplePopup(false);
      setNewPersonEmail('');
      setSuccessMessage(`Email '${newPersonEmail}' added successfully to board.`);
    } catch (error) {
      console.error('Error adding email:', error);
    }
  };

  const handleOkayGotIt = () => {
    setSuccessMessage('');
  };

  const getFormattedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className='dashboard'>
      <div className="header">
        <div className="header-content">
          <h2>Welcome! {user.name}</h2>
          <div className="date">{currentDate}</div>
        </div>
      </div>
      <div className="board">
        <h2>Board <button onClick={handleAddPeople}>Add People</button></h2>
        <div className="filter-dropdown">
          <label htmlFor="filter">Filter:</label>
          <select id="filter">
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
      </div>

      {showAddPeoplePopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleCancel}>&times;</span>
            <h3>Add People to the board</h3>
            <input
              type="email"
              placeholder="Enter email"
              value={newPersonEmail}
              onChange={(e) => setNewPersonEmail(e.target.value)}
            />
            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleAddEmail}>Add Email</button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          <button onClick={handleOkayGotIt}>Okay, Got It</button>
        </div>
      )}

      <TaskPage emails={emails} />
    </div>
  );
};

export default Dashboard;
