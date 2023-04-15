import React, { useState } from "react";
import "./App.css";
import { TodoList, TaskType } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";


function App() {

  // let [tasks, setTasks] = arr;
  let [tasks, setTasks] = useState <Array<TaskType>>([
    { id: 1, title: "CSS&HTML", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);
  let [filtered, setFilter] = useState<FilterValuesType>("all");

  function changeFilter (value: FilterValuesType) {
    setFilter(value)
  }

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
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
      changeFilter={changeFilter} />
    </div>
  );
}
export default App;
