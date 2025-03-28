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
    this.inputRef = null;

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeAgo: formatDistanceToNow(new Date(this.props.task.createdDate), { addSuffix: true }),
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleEditClick() {
    this.setState(
      {
        isEditing: true,
        editText: this.props.task.text,
      },
      () => {
        document.addEventListener('click', this.handleClickOutside);
      }
    );
  }

  handleChange(e) {
    this.setState({ editText: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.saveTask();
    }
  }

  handleClickOutside(e) {
    if (this.state.isEditing && this.inputRef && !this.inputRef.contains(e.target)) {
      this.saveTask();
    }
  }

  saveTask() {
    this.props.onEditTask(this.props.task.id, this.state.editText);
    this.setState({ isEditing: false });
    document.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    const { task, onDeleteTask, onToggleTask } = this.props;
    const { isEditing, editText } = this.state;

    return (
      <li className={task.completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={task.completed} onChange={onToggleTask} />
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              autoFocus
              ref={(input) => (this.inputRef = input)}
            />
          ) : (
            <label onClick={this.handleEditClick}>
              <span className="description">{task.text}</span>
              <span className="created">{`Created ${this.state.timeAgo}`}</span>
            </label>
          )}
          {!isEditing && (
            <>
              <button
                className="icon icon-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  this.handleEditClick();
                }}
              ></button>
              <button className="icon icon-destroy" onClick={onDeleteTask}></button>
            </>
          )}
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  task: {
    text: 'New Task',
    completed: false,
    createdDate: new Date(),
  },
  onDeleteTask: () => {},
  onToggleTask: () => {},
  onEditTask: () => {},
};

Task.propTypes = {
  task: PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};
