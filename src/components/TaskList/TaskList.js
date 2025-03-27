import React from "react";
import PropTypes from "prop-types";
import Task from '../Task/Task';

import './TaskList.css';

const TaskList = ({ tasks, onDeleteTask, onToggleTask, onEditTask }) => {
  
    return (
       <ul className="todo-list">
           { tasks.map((task) => ( 
           <Task 
           key={ task.id } 
           task={ task } 
           onDeleteTask = { () => onDeleteTask(task.id) } 
           onToggleTask = { () => onToggleTask(task.id) } 
           onEditTask = {onEditTask} 
           />
         ))}
       </ul>
    );
};

TaskList.defaultProps = {
  tasks: [],
  onDeleteTask: () => {},
  onToggleTask: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdDate: PropTypes.instanceOf(Date).isRequired,
  })).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskList;