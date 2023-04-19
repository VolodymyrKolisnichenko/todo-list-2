import React, { useState } from "react";
import "./App.css";
import { TodoList, TaskType } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  // let [tasks, setTasks] = arr;
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS&HTML", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }
  function addTask(title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }
  function changeStatus(taskId: string, isDone: boolean) {
    // const task = tasks.map(e => e.id === taskId? e.isDone = !e.isDone: null);
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }

  let todoList: Array<TodoListType> = [
    { id: v1(), title: "What to buy", filter: "active" },
    { id: v1(), title: "What to learn", filter: "completed" },
  ];

  return (
    <div className="App">
      {todoList.map((tl) => {
        let taskForTodoList = tasks;
        if (filter === "completed") {
          taskForTodoList = tasks.filter((el) => el.isDone === true);
        }
        if (filter === "active") {
          taskForTodoList = tasks.filter((el) => el.isDone === false);
        }

        return (
          <TodoList
            title={tl.title}
            tasks={taskForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filtered={tl.filter}
          />
        );
      })}
    </div>
  );
}
export default App;
