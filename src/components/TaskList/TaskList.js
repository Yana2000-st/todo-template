import React from "react";

import Task from '../Task/Task';

import './TaskList.css';

const TaskList = ({ tasks, onDeleteTask, onToggleTask }) => {
  
    return (
       <ul className="todo-list">
           { tasks.map((task) => ( 
           <Task 
           key={ task.id } 
           task={ task } 
           onDeleteTask = { () => onDeleteTask(task.id) } 
           onToggleTask = { () => onToggleTask(task.id) } />
         ))}
       </ul>
    );
};

export default TaskList;