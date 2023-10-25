import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskList from './TaskList';
import TaskInput from './TaskInput';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:3001/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleAddTask = (newTask) => {
   
    axios.post('http://localhost:3001/tasks', { title: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  const handleDeleteTask = (taskId) => {
    
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };


  const handleDeleteAllTasks = () => {
    
    axios.delete('http://localhost:3001/tasks/all')
      .then(() => {
        setTasks([]); 
      })
      .catch((error) => {
        console.error('Error deleting all tasks:', error);
      });
  };


  return (
    <div className="App">
      <h1 id="head1">Todo App</h1>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      <button onClick={handleDeleteAllTasks} className="delete-all-button">
        Delete All
      </button>
    </div>
  );
}

export default App;
