
import React, { useState } from "react";
import "./App.css";
import { TodoList, TaskType } from "./TodoList";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId2, title: "What to buy", filter: "all" },
    { id: todoListId1, title: "What to learn", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
     { id: v1(), title: "CSS&HTML", isDone: true },
     { id: v1(), title: "JS", isDone: true },
     { id: v1(), title: "React", isDone: false },
     { id: v1(), title: "Vue.js", isDone: false },
     { id: v1(), title: "Redux", isDone: false },
     { id: v1(), title: "TypeScript", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Tea", isDone: false },
      { id: v1(), title: "Fruits", isDone: true },
    ],
  })
  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filteredTasks
    setTasks({...tasksObj});
  }
  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({...tasksObj});
  }
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
  }
  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle
      setTasks({...tasksObj});
    }
  }
  function changeFilter(value: FilterValuesType, todoListId: string) {
   let todoList = todoLists.find(el => el.id === todoListId)
   if(todoList) {
    todoList.filter = value
    setTodoLists([...todoLists])
   }
  }
  function removeTodoList(todoListId: string) {
    let filteredTodoList = todoLists.filter(t => t.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasks({...tasksObj})
  }
  function changeTodoListTitle(todoListId: string,  newTitle: string) {
    let todoList = todoLists.find(el => el.id === todoListId)
     if (todoList){
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
    // todoList.title = newTitle
    // setTodoLists(todoList);
    // delete tasksObj[todoListId];
  }


  function addTodoList (title: string){
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: title
    }
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: []
    })
  }
  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === false);
        }

        return (
          <TodoList
            key={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            id={tl.id}
            removeTodoList={removeTodoList}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}
    </div>
  );
}
export default App;
