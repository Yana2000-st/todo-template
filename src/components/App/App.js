import React, { Component } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.maxId = 100;

    this.state = {
      tasks: [
        this.createTodoTask('Completed task'),
        this.createTodoTask('Editing task'),
        this.createTodoTask('Active task'),
      ],
      filter: 'all',
    };

    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.editTask = this.editTask.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  createTodoTask(text) {
    return {
      text,
      completed: false,
      id: this.maxId++,
      createdDate: new Date(),
      timer: 0,
      isTimerRunning: false,
    };
  }

  startTimer(id) {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((task) => {
          if (task.id === id && !task.isTimerRunning) {
            const intervalId = setInterval(() => {
              this.setState((prevState) => ({
                tasks: prevState.tasks.map((t) => {
                  if (t.id === id) {
                    return { ...t, timer: t.timer + 1 };
                  }
                  return t;
                }),
              }));
            }, 1000);

            return { ...task, isTimerRunning: true, timerId: intervalId };
          }
          return task;
        }),
      };
    });
  }

  pauseTimer(id) {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((task) => {
          if (task.id === id && task.isTimerRunning && task.timerId) {
            clearInterval(task.timerId);
            return { ...task, isTimerRunning: false, timerId: null };
          }
          return task;
        }),
      };
    });
  }

  resetTimer(id) {
    this.setState(({ tasks }) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          if (task.timerId) clearInterval(task.timerId);
          return { ...task, timer: 0, isTimerRunning: false, timerId: null };
        }
        return task;
      });
      return { tasks: updatedTasks };
    });
  }

  deleteTask(id) {
    this.setState(({ tasks }) => {
      return { tasks: tasks.filter((task) => task.id !== id) };
    });
  }

  addTask(text, timer) {
    const newTask = {
      ...this.createTodoTask(text),
      timer: timer || 0,
    };
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newTask],
    }));
  }

  toggleTask(id) {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
      return {
        tasks: newTasks,
      };
    });
  }

  getFilteredTasks() {
    const { tasks, filter } = this.state;
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  clearCompleted() {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }));
  }

  editTask(id, newText) {
    this.setState(({ tasks }) => {
      const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, text: newText } : task));
      return { tasks: updatedTasks };
    });
  }

  render() {
    const filteredTasks = this.getFilteredTasks();
    const activeCount = this.state.tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <h1>todos</h1>
        <NewTaskForm onAddTask={this.addTask} />
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={this.deleteTask}
          onToggleTask={this.toggleTask}
          onEditTask={this.editTask}
          onStartTimer={this.startTimer}
          onPauseTimer={this.pauseTimer}
          onResetTimer={this.resetTimer}
        />
        <Footer
          activeCount={activeCount}
          activeFilter={this.state.filter}
          onFilterChange={this.setFilter}
          onClearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
