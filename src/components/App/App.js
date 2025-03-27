import React, { Component } from "react";  
import { formatDistanceToNow } from "date-fns";
import TaskList from "../TaskList/TaskList";  
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import './App.css';

export default class App extends Component {

  maxId = 100;

  state = {
    tasks : [
      this.createTodoTask("Completed task"),
      this.createTodoTask("Editing task"),
      this.createTodoTask("Active task")
    ],
    filter: 'all'
  };

  createTodoTask(text) {
    return {
      text,
      completed: false,
      id: this.maxId++,
      createdDate: new Date(),
    };
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((task) => {
        return task.id !== id
      });
      return {
        tasks : newTasks
      };
    });
  };

  addTask = (text) => {
    const newTask = this.createTodoTask(text);
    this.setState(({ tasks }) => {
        const newArr = [
          ...tasks,newTask
        ];
        return {
          tasks:newArr
        };
    });
  };

  toggleTask = (id) => {
      this.setState(({ tasks }) => {
        const newTasks = tasks.map((task) => {
          if ( task.id === id ) {
            return {
              ...task,
              completed: !task.completed
            };
          };
          return task;
        });
        return {
          tasks: newTasks
        }
      });
  };

  getFilteredTasks() {
    const { tasks, filter } = this.state;
    if (filter === "active") {
      return tasks.filter(task => !task.completed);
    } else if (filter === "completed") {
      return tasks.filter(task => task.completed);
    };
    return tasks;
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed)
    }));
  };

  editTask = (id, newText) => {
    this.setState(({ tasks }) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      );
      return { tasks: updatedTasks };
    });
  };

  render() {

    const filteredTasks = this.getFilteredTasks();
    const activeCount = this.state.tasks.filter(task => !task.completed).length;

    return (
      <section className="todoapp">
        <h1>todos</h1>
        <NewTaskForm onAddTask = { this.addTask } />
        <TaskList tasks = { filteredTasks } 
        onDeleteTask = { this.deleteTask } 
        onToggleTask = { this.toggleTask }
        onEditTask = { this.editTask }
        />  
        <Footer 
          activeCount={ activeCount } 
          activeFilter={ this.state.filter } 
          onFilterChange={ this.setFilter } 
          onClearCompleted={ this.clearCompleted } 
        />
      </section>
    );
  };
};