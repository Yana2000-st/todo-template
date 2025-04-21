import React, { useState } from 'react';

import './NewTaskForm.css';

const NewTaskForm = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    //Ограничиваю минуты и секунды только цифрами
    if ((name === 'minutes' || name === 'seconds') && /[^0-9]/.test(value)) {
      return;
    }
    if (name === 'text') setText(value);
    if (name === 'minutes') setMinutes(value);
    if (name === 'seconds') setSeconds(value);
  };
  //Сделала условие, что, когда человек не вводит время, будет уведомление
  const handleSubmit = (e) => {
    e.preventDefault();

    const totalMinutes = Number(minutes || '0');
    const totalSeconds = Number(seconds || '0');
    const totalTime = totalMinutes * 60 + totalSeconds;

    if (text.trim() && totalTime > 0) {
      onAddTask(text, totalTime);
      setText('');
      setMinutes('');
      setSeconds('');
    } else {
      alert('Пожалуйста, установите время (минуты или секунды) и введите текст задачи. Хорошего дня =)');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input className="new-todo" name="text" placeholder="Task" value={text} onChange={handleChange} autoFocus />
        <input
          className="new-todo-form__timer"
          name="minutes"
          placeholder="Min"
          value={minutes}
          onChange={handleChange}
        />
        <input
          className="new-todo-form__timer"
          name="seconds"
          placeholder="Sec"
          value={seconds}
          onChange={handleChange}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </header>
  );
};

export default NewTaskForm;
