import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default class TaskFilter extends Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }
  render() {
    const { activeFilter, onFilterChange } = this.props;

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
          <button
            className={activeFilter === 'completed' ? 'selected' : ''}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TaskFilter.defaultProps = {
  activeFilter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
