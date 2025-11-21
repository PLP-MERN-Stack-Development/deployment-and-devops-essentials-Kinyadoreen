// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
  };

  return (
    <div className="taskform-container">
      <form onSubmit={handleSubmit} className="taskform">
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        <div className="taskform-buttons">
          <button type="submit">{task ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
