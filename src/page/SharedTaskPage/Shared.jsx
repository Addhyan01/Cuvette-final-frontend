import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getTaskByShareToken } from '../../api/Api';
import "./Shared.css";

const Shared = () => {
  const { token } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [token]);

  const fetchTask = async () => {
    try {
      const { data } = await getTaskByShareToken(token);
      setTask(data);
    } catch (error) {
      console.error('Error fetching task by share token:', error);
    }
  };

  if (!task) {
    return <p>Loading task...</p>;
  }


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

  const dueDateColor = () => {
    if (task.state === 'done') return 'green';
    if (new Date(task.dueDate) < new Date()) return 'red';
    return 'gray';
  };

  return (
    <div className="task-page">
      <div className="modal-container">
        <div className="modal-content">
          <div className="task-card">
          <p> {task.priority.toUpperCase()} PRIORITY</p>
            <h3>{task.title}</h3>
            
           
            <h4>Checklist: {}</h4>
            <ul>
              {task.checklist.map((item, index) => (
                <li key={index}>
                  <label>
                    <input type="checkbox" checked={item.completed || false} readOnly />
                    {item.text}
                  </label>
                </li>
              ))}
            </ul>
            <span>Due Date:</span>
            <span className='abc' > {new Date(task.dueDate).toLocaleDateString()}</span>
         
          <p><span className="due-date" style={{ backgroundColor: dueDateColor(task) ,color:'white'}}>
              {formatDueDate(task.dueDate)
              
              
              
              }
            </span></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Shared;
