// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text); // Call the addTask function passed from App.jsx
      setText(''); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="add-task-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;