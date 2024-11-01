// import React from 'react'

// export default function Analytics() {
//   return (
//     <div>Analytics</div>
//   )
// }


import React, { useState, useEffect } from 'react';
// Assuming you'll add styles for Analytics

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await getTaskAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="analytics-container">
    <h2 style={{ textAlign: 'left', marginLeft: '20px' }}>Analytics</h2>
    {analytics ? (
        <div className="analytics-content">
          <div className="analytics-section">
            <div className="analytics-list">
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">Backlog Tasks:</span>
                <span className="task-value">{analytics.backlogTasks}</span>
              </div>
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">To Do Tasks:</span>
                <span className="task-value">{analytics.todoTasks}</span>
              </div>
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">In Progress Tasks:</span>
                <span className="task-value">{analytics.inProgressTasks}</span>
              </div>
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">Completed Tasks:</span>
                <span className="task-value">{analytics.completedTasks}</span>
              </div>
            </div>
          </div>
          <div className="analytics-section">
            <div className="analytics-list">
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">Low Priority Tasks:</span>
                <span className="task-value">{analytics.lowPriorityTasks}</span>
              </div>
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">Medium Priority Tasks:</span>
                <span className="task-value">{analytics.mediumPriorityTasks}</span>
              </div>
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">High Priority Tasks:</span>
                <span className="task-value">{analytics.highPriorityTasks}</span>
              </div>
              <div className="analytics-item">
              <span className="dot"></span>
                <span className="task-name">Due Date Tasks:</span>
                <span className="task-value">{analytics.dueDateTasks}</span>
              </div>
            </div>
          </div>
          {/* Add more sections for other analytics */}
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default AnalyticsPage;
