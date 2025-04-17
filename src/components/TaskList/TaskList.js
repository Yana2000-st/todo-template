import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleteTask, onToggleTask, onEditTask, onStartTimer, onPauseTimer, onResetTimer } = this.props;
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
  }
}
//Я еще даже не изучала тайпскрипт, поэтому просто переделала на классовый компонент, после дедлайна обязательно изучу данный вопрос
TaskList.defaultProps = {
  tasks: [],
  onDeleteTask: () => {},
  onToggleTask: () => {},
  onEditTask: () => {},
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
