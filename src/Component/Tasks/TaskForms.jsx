import React, { useState, useEffect } from 'react';

import { createTask } from "../../api/Api";
import { getUserDetails } from "../../api/Api";
import './TaskForms.css';
import deleteIcon from '../../assets/Delete.png'; // Import your delete icon from assets

const TaskForms = ({ onTaskCreated, onClose }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [checklistItems, setChecklistItems] = useState([{ text: '', completed: false }]);
  const [addedEmails, setAddedEmails] = useState([]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data } = await getUserDetails();
      setAddedEmails(data.addedEmails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title,
        priority,
        dueDate,
        assignedTo,
        checklist: checklistItems.filter(item => item.text.trim() !== '')
      };
      const { data } = await createTask(taskData);
      onTaskCreated(data);
      handleClose();
    } catch (error) {
      console.log(error);
      alert('Failed to create task');
    }
  };

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();  // Ensure onClose is a function before calling it
    }
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setPriority('');
    setDueDate('');
    setAssignedTo('');
    setChecklistItems([{ text: '', completed: false }]);
  };

  const handlePriorityClick = (value) => {
    setPriority(value);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { text: '', completed: false }]);
  };

  const handleChecklistItemChange = (index, value) => {
    const newChecklist = [...checklistItems];
    newChecklist[index].text = value;
    setChecklistItems(newChecklist);
  };

  const handleRemoveChecklistItem = (index) => {
    const newChecklist = [...checklistItems];
    newChecklist.splice(index, 1);
    setChecklistItems(newChecklist);
  };

  return (
    <div className="task-form-popup">
      <div className="task-form-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <form onSubmit={handleSubmit} className="task-form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="priority-buttons">
            <label>Select Priority:</label>
            <button
              type="button"
              className={`priority-button ${priority === 'low' ? 'selected' : ''}`}
              onClick={() => handlePriorityClick('low')}
            >
              Low
            </button>
            <button
              type="button"
              className={`priority-button ${priority === 'medium' ? 'selected' : ''}`}
              onClick={() => handlePriorityClick('medium')}
            >
              Moderate
            </button>
            <button
              type="button"
              className={`priority-button ${priority === 'high' ? 'selected' : ''}`}
              onClick={() => handlePriorityClick('high')}
            >
              High
            </button>
          </div>

          <label>Assign to:</label>
          {addedEmails.length > 0 && (
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Assign to</option>
              {addedEmails.map((email, index) => (
                <option key={index} value={email}>{email}</option>
              ))}
            </select>
          )}

          <div className="checklist">
            <h4>Checklist:</h4>
            {checklistItems.map((item, index) => (
              <div key={index} className="checklist-item">
                <div className="checklist-item-container">
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                    placeholder={`Item ${index + 1}`}
                  />
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="delete-icon"
                    onClick={() => handleRemoveChecklistItem(index)}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddChecklistItem}
            >
              Add Item
            </button>
          </div>

          <div className="date-picker">
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={handleClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForms;
