import React, { Component } from "react";  

import TaskList from "../TaskList/TaskList";  
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";

import './App.css';

export default class App extends Component {

  state = {
    tasks : [
      { id: 1, text: "Completed task", completed: true },
      { id: 2, text: "Editing task", completed: false },
      { id: 3, text: "Active task", completed: false },
    ]
  };

  deleteTask = (id) => {
    this.setState(({tasks}) => {
      const newTasks = tasks.filter((task) => {
        return task.id !== id
      });
      return {
        tasks : newTasks
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

  render() {
    return (
      <section className="todoapp">
        <h1>todos</h1>
        <NewTaskForm />
        <TaskList tasks={ this.state.tasks } 
        onDeleteTask = { this.deleteTask } 
        onToggleTask = { this.toggleTask }/>  
        <Footer />
      </section>
    );
  };
};