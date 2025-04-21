import React from 'react';

import './TaskFilter.css';

const TaskFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <ul className="filters">
      <li>
        <button className={activeFilter === 'all' ? 'selected' : ''} onClick={() => onFilterChange('all')}>
          All
        </button>
      </li>
      <li>
        <button className={activeFilter === 'active' ? 'selected' : ''} onClick={() => onFilterChange('active')}>
          Active
        </button>
      </li>
      <li>
        <button className={activeFilter === 'completed' ? 'selected' : ''} onClick={() => onFilterChange('completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TaskFilter;
