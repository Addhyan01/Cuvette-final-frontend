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
            <h3>{task.title}</h3>
            <p>Priority: {task.priority}</p>
            <p style={{ color: dueDateColor() }}>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <h4>Checklist:</h4>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shared;
