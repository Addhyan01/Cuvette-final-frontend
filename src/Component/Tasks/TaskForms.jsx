  import React, { useState, useEffect } from 'react';

  import { createTask } from "../../api/Api";
  import { getUserDetails } from "../../api/Api";
  import './TaskForms.css';
  import deleteIcon from '../../assets/Delete.png'; // Import your delete icon from assets

  const TaskForms = ({ onTaskCreated, onClose }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(null);
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

    const convertedDueDate = new Date(dueDate);
    const isJan1 = convertedDueDate.getFullYear() === 1970 && 
                   convertedDueDate.getMonth() === 1 && 
                   convertedDueDate.getDate() === 1;


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const taskData = {
          title,
          priority,
          dueDate: isJan1 ? null : convertedDueDate,
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
        onClose(); // Ensure onClose updates the parent state to close the popup
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
          
          <form onSubmit={handleSubmit} className="task-form">
            <label>Title<span className='required'> *</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="priority-buttons">
              <label>Select Priority<span className='required'> *</span></label>
            
              <button
                type="button"
                className={`priority-button ${priority === 'high' ? 'selected' : ''}`}
                onClick={() => handlePriorityClick('high')}
              >
                <span className="dot red"></span> HIGH PRIORITY
              </button>

              
              <button
                type="button"
                className={`priority-button ${priority === 'medium' ? 'selected' : ''}`}
                onClick={() => handlePriorityClick('medium')}>
              <span className="dot blue"></span> MODERATE PRIORITY
              </button>

              <button
                type="button"
                className={`priority-button ${priority === 'low' ? 'selected' : ''}`}
                onClick={() => handlePriorityClick('low')}
              >
                <span className="dot green"></span> LOW PRIORITY
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
              <h4>Checklist<span className='required'> *</span></h4>
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
              className='add-button'
                type="button"
                onClick={handleAddChecklistItem}
              >
              <span>+</span> Add Item
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
              <button type="button"  onClick={handleClose} className='cancel-button'>Cancel</button>
              <button type="submit" className='save-button'>Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default TaskForms;
