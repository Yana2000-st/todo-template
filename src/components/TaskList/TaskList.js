import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

const TaskList = ({ tasks, onDeleteTask, onToggleTask, onEditTask, onStartTimer, onPauseTimer, onResetTimer }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={() => onDeleteTask(task.id)}
          onToggleTask={() => onToggleTask(task.id)}
          onEditTask={onEditTask}
          onStartTimer={() => onStartTimer(task.id)}
          onPauseTimer={() => onPauseTimer(task.id)}
          onResetTimer={() => onResetTimer(task.id)}
        />
      ))}
    </ul>
  );
};

TaskList.defaultProps = {
  tasks: [],
  onDeleteTask: () => {},
  onToggleTask: () => {},
  onStartTimer: () => {},
  onPauseTimer: () => {},
  onResetTimer: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdDate: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onResetTimer: PropTypes.func.isRequired,
};

export default TaskList;
