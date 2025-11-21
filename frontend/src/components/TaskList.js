// src/components/TaskList.js
import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="tasklist">
      {tasks.map(task => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)} className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
