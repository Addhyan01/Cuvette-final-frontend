import React, { useState } from 'react'
import TaskList from '../../Component/Task/TaskList';
import TaskForms from '../../Component/Task/TaskForms';
import "./Taskpage.css"

export default function TaskPage() {

  const [collapseStates, setCollapseStates] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowTaskForm(false); // Hide task form after creation
  };

  const handleTaskUpdated = async (id, updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      fetchTasks(); // Refresh tasks after update
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  const handleTaskDeleted = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };







  return (
    <div className="task-page">
    <div className="task-columns">
      <div className="task-column">
        <h3>
          Backlog
          <img
           src="../Colaps.png"
            alt="Collapse"
            className="icon"
            onClick={() => toggleCollapse('backlog')}
          />
        </h3>
        {!collapseStates.backlog && (
          <TaskList
            // tasks={tasks.filter((task) => task.state === 'backlog')}
            // onEdit={handleTaskUpdated}
            // onDelete={handleTaskDeleted}
          />
        )}
      </div>
      <div className="task-column">
        <div className='box-cc'>
        <div className='text-h3'>
        <p>To do </p></div>
        <div className='add'>
          <button onClick={() => setShowTaskForm(true)} className="add-task-button">
            <img src="../plus.png" alt="Add Task" className="iconadd" />
          </button>
          <img
            src="../Colaps.png"
            alt="Collapse"
            className="icon"
            onClick={() => toggleCollapse('todo')}
          />
          </div>
        </div>
        {!collapseStates.todo && (
          <TaskList
            tasks={tasks.filter((task) => task.state === 'todo')}
            onEdit={handleTaskUpdated}
            onDelete={handleTaskDeleted}
          />
        )}
      </div>
      <div className="task-column">
        <h3>
          In Progress
          <img
            src="../Colaps.png"
            alt="Collapse"
            className="icon"
            onClick={() => toggleCollapse('inProgress')}
          />
        </h3>
        {!collapseStates.inProgress && (
          <TaskList
            tasks={tasks.filter((task) => task.state === 'in-progress')}
            onEdit={handleTaskUpdated}
            onDelete={handleTaskDeleted}
          />
        )}
      </div>
      <div className="task-column">
        <h3>
          Done
          <img
            src="../Colaps.png"
            alt="Collapse"
            className="icon"
            onClick={() => toggleCollapse('done')}
          />
        </h3>
        {!collapseStates.done && (
          <TaskList
            tasks={tasks.filter((task) => task.state === 'done')}
            onEdit={handleTaskUpdated}
            onDelete={handleTaskDeleted}
          />
        )}
      </div>
    </div>

    {/* Conditional rendering of TaskForm */}
    {showTaskForm && (
      <div className="modal-container">
        <div className="modal-content">
          <TaskForms onTaskCreated={handleTaskCreated} />
        </div>
      </div>
    )}
  </div>
  )
}
