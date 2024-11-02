import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, collapseAllChecklists }) => {
  const handleStateChange = (id, newState) => {
    const updatedTask = { ...tasks.find(task => task._id === id), state: newState };
    onEdit(id, updatedTask); // Call parent component's onEdit function to update the task
  };

  const formatDueDate = (dateString) => {
    // const options = { month: 'short', day: 'numeric' };
    // const date = new Date(dateString);
    // const formattedDate = date.toLocaleDateString('en-US', options);
    // const day = date.getDate();
    // let suffix = 'th';

    // if (day % 10 === 1 && day !== 11) suffix = 'st';
    // else if (day % 10 === 2 && day !== 12) suffix = 'nd';
    // else if (day % 10 === 3 && day !== 13) suffix = 'rd';

    // return `${formattedDate}${suffix}`;


    if (!dateString) return null; // Return null if dateString is falsy (null or undefined)
    
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) return null; // Return null if date is invalid
    
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    let suffix = 'th';

    if (day % 10 === 1 && day !== 11) suffix = 'st';
    else if (day % 10 === 2 && day !== 12) suffix = 'nd';
    else if (day % 10 === 3 && day !== 13) suffix = 'rd';

   
  
      return `${formattedDate}${suffix}`;
  
    
    
    

  };
  

  const dueDateColor = (task) => {
    if (task.state === 'done') return 'green';
    if (new Date(task.dueDate) < new Date()) return 'red';
    return 'gray';
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} collapseAllChecklists={collapseAllChecklists} />
          <div className="task-footer">
            <span className="due-date" style={{ backgroundColor: dueDateColor(task) ,color:'white'}}>
              {formatDueDate(task.dueDate)
              
              
              
              }
            </span>
            <div className="task-buttons">
              {task.state !== 'backlog' && (
                <button onClick={() => handleStateChange(task._id, 'backlog')}>Backlog</button>
              )}
              {task.state !== 'todo' && (
                <button onClick={() => handleStateChange(task._id, 'todo')}>To Do</button>
              )}
              {task.state !== 'in-progress' && (
                <button onClick={() => handleStateChange(task._id, 'in-progress')}>In Progress</button>
              )}
              {task.state !== 'done' && (
                <button onClick={() => handleStateChange(task._id, 'done')}>Done</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
