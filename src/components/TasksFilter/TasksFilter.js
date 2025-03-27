import React, { act, Component } from "react";
import './TaskFilter.css';
import PropTypes from "prop-types";

export default class TaskFilter extends Component {
  
  render() {
    const { activeFilter, onFilterChange } = this.props;

    return (
      <ul className="filters">
        <li>
          <button 
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
        </li>
        <li>
          <button 
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => onFilterChange("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button 
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => onFilterChange("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  };
};

TaskFilter.defaultProps = {
  activeFilter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};