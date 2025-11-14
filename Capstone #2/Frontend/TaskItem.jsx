// src/components/TaskItem.jsx
import React from 'react';
import './TaskItem.css'; // Optional: for basic styling

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  // Determine if the task is completed for styling purposes
  const taskStyle = task.completed ? { textDecoration: 'line-through', color: '#888' } : {};

  return (
    <div className="task-item" style={taskStyle}>
      <div className="task-content">
        {/* Task text */}
        <span className="task-text">{task.text}</span>
      </div>
      
      <div className="task-actions">
        {/* Toggle Complete Button */}
        <button
          className={`toggle-btn ${task.completed ? 'undo-btn' : 'complete-btn'}`}
          onClick={() => toggleComplete(task._id, task.completed)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>

        {/* Delete Button */}
        <button
          className="delete-btn"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;