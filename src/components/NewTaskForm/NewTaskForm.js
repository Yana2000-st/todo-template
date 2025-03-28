import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.text.trim()) {
      this.props.onAddTask(this.state.text);
      this.setState({
        text: '',
      });
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.text}
            onChange={this.onTextChange}
            autoFocus
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onAddTask: () => {},
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
