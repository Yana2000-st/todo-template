import React from "react";

import Task from '../Task/Task';

import './TaskList.css';

const TaskList = ({ tasks }) => {
  
    return (
       <ul className="todo-list">
           { tasks.map((task) => ( 
           <Task key={ task.id } task={ task } />
         ))}
       </ul>
    );
};

export default TaskList;