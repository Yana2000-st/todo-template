import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';

import './Footer.css';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }
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
  }
}

Footer.defaultProps = {
  activeCount: 0,
  activeFilter: 'all',
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};
