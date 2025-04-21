import React from 'react';

import TaskFilter from '../TaskFilter/TaskFilter';

import './Footer.css';

const Footer = ({ activeCount, activeFilter, onFilterChange, onClearCompleted }) => {
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

export default Footer;
