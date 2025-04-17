import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAgo: formatDistanceToNow(new Date(this.props.task.createdDate), { addSuffix: true }),
      isEditing: false,
      editText: this.props.task.text,
    };

    this.inputRef = React.createRef();

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeAgo: formatDistanceToNow(new Date(this.props.task.createdDate), { addSuffix: true }),
      });
    }, 5000);
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscapeKey);
  }
  // Включает режим редактирования при клике на текст
  handleEditClick(e) {
    e.stopPropagation();
    this.setState(
      {
        isEditing: true,
        editText: this.props.task.text,
      },
      () => {
        document.addEventListener('click', this.handleClickOutside);
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }
    );
  }
  //Выход из редактирования на ESC
  handleEscapeKey(e) {
    if (e.key === 'Escape' && this.state.isEditing) {
      this.setState({ isEditing: false });
      document.removeEventListener('click', this.handleClickOutside);
    }
  }
  //Отслеживает редактирования
  handleChange(e) {
    this.setState({ editText: e.target.value });
  }
  //Сохраняет редактирование при нажатии Enter
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.saveTask();
    }
  }
  //Сохраняет редактирование при нажатии на любую область
  handleClickOutside(e) {
    if (this.state.isEditing && this.inputRef.current && !this.inputRef.current.contains(e.target)) {
      this.saveTask();
    }
  }
  //Предотвращает закрытие при клике
  handleInputClick(e) {
    e.stopPropagation();
  }

  saveTask() {
    const { task, onEditTask } = this.props;
    const { editText } = this.state;
    if (editText.trim() !== task.text) {
      onEditTask(task.id, editText.trim());
    }
    this.setState({ isEditing: false });
    document.removeEventListener('click', this.handleClickOutside);
  }
  //Превращает количество секунд в строку, удобную для чтения
  formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  }

  render() {
    const { task, onDeleteTask, onToggleTask, onStartTimer, onPauseTimer } = this.props;
    const { isEditing, editText, timeAgo } = this.state;

    return (
      <li className={`todo-list-item ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={task.completed}
            onChange={onToggleTask}
            id={`toggle-${task.id}`}
          />

          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              ref={this.inputRef}
              className="edit"
              onClick={this.handleInputClick}
            />
          ) : (
            <label htmlFor={`toggle-${task.id}`}>
              <span className="description task-content" onClick={this.handleEditClick}>
                {task.text}
              </span>
            </label>
          )}

          {!isEditing && (
            <div className="controls">
              <button
                className={`icon ${task.isTimerRunning ? 'icon-pause' : 'icon-play'}`}
                onClick={task.isTimerRunning ? () => onPauseTimer(task.id) : () => onStartTimer(task.id)}
              ></button>
              <span className="timer">{this.formatTime(task.timer)}</span>
              <span className="created">Created {timeAgo}</span>
              <button className="icon icon-edit" onClick={this.handleEditClick}></button>
              <button className="icon icon-destroy" onClick={() => onDeleteTask(task.id)}></button>
            </div>
          )}
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  onDeleteTask: () => {},
  onToggleTask: () => {},
  onEditTask: () => {},
  onStartTimer: () => {},
  onPauseTimer: () => {},
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdDate: PropTypes.instanceOf(Date).isRequired,
    timer: PropTypes.number,
    isTimerRunning: PropTypes.bool,
  }).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
};
