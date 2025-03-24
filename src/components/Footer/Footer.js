import React, { Component } from "react";
import TaskFilter from "../TasksFilter/TasksFilter";
import './Footer.css';

export default class Footer extends Component {

  render() {
    const { activeCount, activeFilter, onFilterChange, onClearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{activeCount} items left</span>
        <TaskFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  };
};