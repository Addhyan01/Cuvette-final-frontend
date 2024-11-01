import React, { useState, useEffect } from 'react';
import TaskPage from '../TaskPage/TaskPage';
import "./Dashboard.css"




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

  const fetchUserDetails = () => {
    
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
    <div>
      <div className="header">
        <div className="header-content">
          <p>Welcome! UserName{user.name}</p>
          <div className="date">{currentDate}</div>
        </div>
      </div>
      <div className="board">
        <div className='board-text'>
        <p>Board  <button onClick={handleAddPeople}><img src="../Addpeo.png" alt="Add" />Add People</button></p>
        </div>
        
        <div className="  ">
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

      <TaskPage  />
    </div>
  );
};

export default Dashboard;
