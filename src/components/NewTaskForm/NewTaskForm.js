import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      minutes: '',
      seconds: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    //Ограничиваю минуты и секунды только цифрами
    if ((name === 'minutes' || name === 'seconds') && /[^0-9]/.test(value)) {
      return;
    }
    this.setState({ [name]: value });
  }
  //Сделала условие, что, когда человек не вводит время, будет уведомление
  onSubmit(e) {
    e.preventDefault();
    const { text, minutes, seconds } = this.state;

    const totalMinutes = parseInt(minutes || '0', 10);
    const totalSeconds = parseInt(seconds || '0', 10);
    const totalTime = totalMinutes * 60 + totalSeconds;

    if (text.trim() && totalTime > 0) {
      this.props.onAddTask(text, totalTime);
      this.setState({ text: '', minutes: '', seconds: '' });
    } else {
      alert('Пожалуйста, установите время (минуты или секунды) и введите текст задачи. Хорошего дня =)');
    }
  }

  render() {
    const { text, minutes, seconds } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input className="new-todo" name="text" placeholder="Task" value={text} onChange={this.onChange} autoFocus />
          <input
            className="new-todo-form__timer"
            name="minutes"
            placeholder="Min"
            value={minutes}
            onChange={this.onChange}
          />
          <input
            className="new-todo-form__timer"
            name="seconds"
            placeholder="Sec"
            value={seconds}
            onChange={this.onChange}
          />
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
