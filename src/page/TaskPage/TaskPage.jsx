import React, { useState, useEffect } from 'react';
import TaskForms from "../../Component/Tasks/TaskForms";
import TaskList from "../../Component/Tasks/TaskList"; 
import { updateTask, getTasks, deleteTask } from '../../api/Api';
import './Taskpage.css';
import plusIcon from '../../assets/plus.png'; // Import your plus icon from assets
import collapseIcon from '../../assets/Colaps.png'; // Import your collapse icon from assets

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false); // State for toggling task form
  const [collapseStates, setCollapseStates] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });
  const [collapseAllChecklists, setCollapseAllChecklists] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowTaskForm(false); 
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

  const toggleCollapse = (column) => {
    setCollapseStates({
      ...collapseStates,
      [column]: !collapseStates[column],
    });
  };
  const collapseAll = () => {
    setCollapseAllChecklists(true); // Set this state to collapse all checklists
  };

  const handleCloseForm = () => {
    setShowTaskForm(false); // This will close the form
  };

  return (
    <div className="task-page">
      <div className="task-columns">
        <div className="task-column">
          <h3>
            Backlog
            <img
              src={collapseIcon}
              alt="Collapse"
              className="icon"
              onClick={() => toggleCollapse('backlog')}
            />
          </h3>
          {!collapseStates.backlog && (
            <TaskList
              tasks={tasks.filter((task) => task.state === 'backlog')}
              onEdit={handleTaskUpdated}
              onDelete={handleTaskDeleted}
              collapseAllChecklists={collapseAllChecklists}
            />
          )}
        </div>
        <div className="task-column">
          <h3>
            To Do
            <button onClick={() => setShowTaskForm(true)} className="add-task-button">
              <img src={plusIcon} alt="Add Task" className="icon" />
            </button>
            <img
              src={collapseIcon}
              alt="Collapse"
              className="icon"
              onClick={() => toggleCollapse('todo')}
            />
          </h3>
          {!collapseStates.todo && (
            <TaskList
              tasks={tasks.filter((task) => task.state === 'todo')}
              onEdit={handleTaskUpdated}
              onDelete={handleTaskDeleted}
              collapseAllChecklists={collapseAllChecklists}
            />
          )}
        </div>
        <div className="task-column">
          <h3>
            In Progress
            <img
              src={collapseIcon}
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
              collapseAllChecklists={collapseAllChecklists}
            />
          )}
        </div>
        <div className="task-column">
          <h3>
            Done
            <img
              src={collapseIcon}
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
              collapseAllChecklists={collapseAllChecklists}
            />
          )}
        </div>
      </div>

      {/* Conditional rendering of TaskForm */}
      {showTaskForm && (
        <div className="modal-container">
          <div className="modal-content">
            <TaskForms onTaskCreated={handleTaskCreated} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
