// src/pages/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const res = await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map(t => t._id === editingTask._id ? res.data.data : t));
      } else {
        const res = await axios.post('http://localhost:5000/api/tasks', taskData);
        setTasks([res.data.data, ...tasks]);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <div>
          <button onClick={handleAddTask}>+ Add Task</button>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          {error && <p className="error">{error}</p>}

          {showForm && (
            <TaskForm
              task={editingTask}
              onSave={handleSaveTask}
              onClose={handleCloseForm}
            />
          )}

          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />

          {tasks.length === 0 && !showForm && <p>No tasks yet. Create your first task!</p>}
        </>
      )}
    </div>
  );
};

export default Dashboard;
