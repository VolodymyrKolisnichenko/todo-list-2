import React, { useState } from "react";
import "./App.css";
import { TodoList, TaskType } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";


function App() {

  // let [tasks, setTasks] = arr;
  let [tasks, setTasks] = useState <Array<TaskType>>([
    { id: v1(), title: "CSS&HTML", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);
  let [filtered, setFilter] = useState<FilterValuesType>("all");

 
  function changeFilter (value: FilterValuesType) {
    setFilter(value)
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }
  function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks)
  }
  function changeStatus(status) {
    const changeStatusTasks = tasks.map(e => e.isDone === status? e.isDone = !e.isDone: null);
    setTasks(changeStatusTasks)
  }

  let taskForTodoList = tasks;
  if (filtered === "completed") {
    taskForTodoList = tasks.filter(el => el.isDone === true)
  }
  if (filtered === "active") {
    taskForTodoList = tasks.filter(el => el.isDone === false)
  }

  return (
    <div className="App">
      <TodoList 
      title="What to learn" 
      tasks={taskForTodoList} 
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
      changeStatus={changeStatus} />
    </div>
  );
}
export default App;
