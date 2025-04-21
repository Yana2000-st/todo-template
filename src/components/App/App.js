import React, { useState, useEffect, useRef } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const maxIdRef = useRef(100);

  const intervalsRef = useRef({});

  //Новая задача
  const createTodoTask = (text) => {
    return {
      text,
      completed: false,
      id: maxIdRef.current++,
      createdDate: new Date(),
      timer: 0,
      isTimerRunning: false,
    };
  };

  //Запускаю таймер задачи
  const startTimer = (id) => {
    if (intervalsRef.current[id]) return;

    const intervalId = setInterval(() => {
      setTasks((currentTasks) =>
        currentTasks.map((t) => {
          if (t.id === id) {
            const newTime = t.timer - 1;
            if (newTime <= 0) {
              clearInterval(intervalsRef.current[id]);
              delete intervalsRef.current[id];
              return { ...t, timer: 0, isTimerRunning: false };
            }
            return { ...t, timer: newTime };
          }
          return t;
        })
      );
    }, 1000);

    intervalsRef.current[id] = intervalId;

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isTimerRunning: true } : task)));
  };

  //Пауза таймера
  const pauseTimer = (id) => {
    clearInterval(intervalsRef.current[id]);
    delete intervalsRef.current[id];

    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isTimerRunning: false } : task)));
  };
  //Обнуление таймера, когда задача выполнена
  useEffect(() => {
    tasks.forEach((task) => {
      if (task.completed && task.isTimerRunning) {
        pauseTimer(task.id);
        setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, timer: 0 } : t)));
      }
    });
  }, [tasks]);

  const deleteTask = (id) => {
    clearInterval(intervalsRef.current[id]);
    delete intervalsRef.current[id];
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = (text, timer) => {
    const newTask = {
      ...createTodoTask(text),
      timer: timer || 0,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  //Возвращает отфильтрованные задачи
  const getFilteredTasks = () => {
    if (filter === 'active') return tasks.filter((task) => !task.completed);
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const editTask = (id, newText) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const filteredTasks = getFilteredTasks();
  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <h1>todos</h1>
      <NewTaskForm onAddTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask}
        onEditTask={editTask}
        onStartTimer={startTimer}
        onPauseTimer={pauseTimer}
      />
      <Footer
        activeCount={activeCount}
        activeFilter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
    </section>
  );
};

export default App;
