import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import './Task.css';

export default class Task extends Component {

  state = {
    timeAgo: formatDistanceToNow(new Date(this.props.task.createdDate), { addSuffix: true }) 
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeAgo: formatDistanceToNow(new Date(this.props.task.createdDate), { addSuffix: true }) 
      });
    }, 5000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  render() {

    const { task, onDeleteTask, onToggleTask } = this.props;

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
          <span className="created">
              {`Created ${this.state.timeAgo}`}
            </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick = { onDeleteTask }></button>
      </div>
    </li>
    );
  };
};

Task.defaultProps = {
  task: {
    text: "New Task",
    completed: false,
    createdDate: new Date(),
  },
  onDeleteTask: () => {},
  onToggleTask: () => {},
};

Task.propTypes = {
  task: PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
};