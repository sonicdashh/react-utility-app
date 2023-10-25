import React, { useState } from 'react';
import "./TaskInput.css"

function TaskInput({ onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    onAddTask(newTask); 
    setNewTask('');
  };

  return (
    <div className="task-input">
      <input
        id="input1"
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
}

export default TaskInput;
