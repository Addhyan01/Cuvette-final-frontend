import React, { useState } from 'react';

import './TaskCard.css';
import arrowUpIcon from '../../assets/arrowUp.svg'; 
import arrowDownIcon from '../../assets/arrowDown.svg'; 

const TaskCard = ({ task, onEdit, onDelete, collapseAllChecklists }) => {
  const { _id, title, priority, dueDate, state, checklist, shareToken, assignedTo } = task;
  const [showDropdown, setShowDropdown] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    ...task,
    checklist: task.checklist.map(item => ({ ...item })) 
  });
  const [showChecklist, setShowChecklist] = useState(true); 

  const dueDateColor = () => {
    if (state === 'done') return 'green';
    if (new Date(dueDate) < new Date()) return 'red';
    return 'gray';
  };

  const hasDueDate = () => dueDate !== '';
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    setEditing(true);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleUpdate = () => {
    onEdit(_id, updatedTask);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedTask({ ...task });
  };

  const handleDelete = () => {
    onDelete(_id);
    setShowDropdown(false);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/task/${shareToken}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
    setShowDropdown(false);
  };

  const toggleCheckbox = (index) => {
    const newChecklist = [...updatedTask.checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setUpdatedTask({ ...updatedTask, checklist: newChecklist });
    onEdit(_id, { ...updatedTask, checklist: newChecklist });
  };

  const toggleChecklistVisibility = () => {
    setShowChecklist(!showChecklist);
  };

 
  const formatAssignedTo = (email) => {
    if (!email) return ''; 
    else {
      if (Array.isArray(email)) {
        email = email[0]; 
      }

    
      const emailStr = String(email);
      if (emailStr === 'undefined') return '';

      return emailStr.substring(0, 2).toUpperCase();
    }
  };

  const assignedToFormatted = formatAssignedTo(assignedTo);

  
  const checkedCount = updatedTask.checklist.filter(item => item.completed).length;
  const totalCount = updatedTask.checklist.length;

  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return '#63C05B';
      case 'medium':
        return '#18B0FF';
      case 'high':
        return '#FF2473';
      default:
        return 'gray'; 
    }
  };

  return (
    <div className="task-card">
      <div className="task-details">
        <div className="priority-title">
          <div className="priority-content">
            <div className={`priority-dot`} style={{ backgroundColor: getPriorityColor(priority) }}></div>
            <p>{priority.toUpperCase()} PRIORITY</p>
          </div>
          {assignedTo && (
           
            <p className='assigned-to'>{assignedToFormatted}</p>
          )}
          <div className="dropdown-button">
            <button className="ellipsis-button" onClick={toggleDropdown}><h2>...</h2></button>
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleShare}>Share</button>
              <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
            </div>
          )}
        </div>
        {editing ? (
          <div className="edit-form">
            <input type="text" name="title" value={updatedTask.title} onChange={handleChange} />
            <select name="priority" value={updatedTask.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleChange} />
            {showChecklist && (
              <ul>
                {updatedTask.checklist.map((item, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={item.completed || false}
                        onChange={() => toggleCheckbox(index)}
                      />
                      <span>{item.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <>
            <h3 className='titles'>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</h3>
            <h4 className="checklist-header">
              Checklist: ({checkedCount}/{totalCount})
              <button className="toggle-checklist" onClick={toggleChecklistVisibility}>
                {showChecklist ? <img src={arrowUpIcon} alt="Collapse" /> : <img src={arrowDownIcon} alt="Expand" />}
              </button>
            </h4>
            {showChecklist && (
              <ul>
                {updatedTask.checklist.map((item, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={item.completed || false}
                        onChange={() => toggleCheckbox(index)}
                      />
                      <span>{item.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
