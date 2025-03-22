import React from "react";

import './Task.css';

const Task = ({ task, onDeleteTask, onToggleTask }) => {

    return (
        <li className={ task.completed ? "completed" : "" }>  
        <div className="view">
          <input 
          className="toggle" 
          type="checkbox" 
          checked ={ task.completed } 
          onChange = { onToggleTask }/>
          <label>
            <span className="description">{ task.text }</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick = { onDeleteTask }></button>
        </div>
      </li>
    );
  };

  export default Task;