import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

const Task = ({ task, onDeleteTask, onToggleTask, onStartTimer, onPauseTimer, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false); //Задача не редактируется сейчас
  const [editText, setEditText] = useState(task.text); //Текст из инпута
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(task.createdDate), { addSuffix: true }));

  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(task.createdDate), { addSuffix: true }));
    }, 5000);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isEditing, task.createdDate]);

  // Включает режим редактирования при клике на текст
  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditText(task.text);
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  //Отслеживает редактирования
  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  //Сохраняет редактирование при нажатии Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveTask();
    }
  };

  //Сохраняет редактирование при нажатии на любую область
  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      saveTask();
    }
  };

  //Выход из редактирования на ESC
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && isEditing) {
      setIsEditing(false);
      document.removeEventListener('click', handleClickOutside);
    }
  };

  //Предотвращает закрытие при клике
  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const saveTask = () => {
    if (editText.trim() !== task.text) {
      onEditTask(task.id, editText.trim());
    }
    setIsEditing(false);
    document.removeEventListener('click', handleClickOutside);
  };

  //Превращает количество секунд в строку, удобную для чтения
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <li className={`todo-list-item ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={onToggleTask}
          id={`toggle-${task.id}`}
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="edit"
            onClick={handleInputClick}
          />
        ) : (
          <label htmlFor={`toggle-${task.id}`}>
            <span className="description task-content" onClick={handleEditClick}>
              {task.text}
            </span>
          </label>
        )}

        {!isEditing && (
          <div className="controls">
            <button
              className={`icon ${task.isTimerRunning ? 'icon-pause' : 'icon-play'}`}
              onClick={task.isTimerRunning ? () => onPauseTimer(task.id) : () => onStartTimer(task.id)}
            ></button>
            <span className="timer">{formatTime(task.timer)}</span>
            <span className="created">Created {timeAgo}</span>
            <button className="icon icon-edit" onClick={handleEditClick}></button>
            <button className="icon icon-destroy" onClick={() => onDeleteTask(task.id)}></button>
          </div>
        )}
      </div>
    </li>
  );
};

export default Task;
