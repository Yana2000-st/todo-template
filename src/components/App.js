import React from "react";  

import TaskList from "./TaskList";  

const App = () => {

  const tasks = [
    { id: 1, text: "Completed task", completed: true, created: new Date() },
    { id: 2, text: "Editing task", completed: true, created: new Date() },
    { id: 3, text: "Active task", completed: false, created: new Date() },
  ];

  return (
    <section className="todoapp">
      <h1>todos</h1>
      <TaskList tasks={ tasks } />  
    </section>
  );
};

export default App;  
