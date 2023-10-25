import React from 'react';
import "./TaskList.css"

function TaskList({ tasks, onDeleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id}>
          {task.title}
          <button id="del1" onClick={() => onDeleteTask(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
