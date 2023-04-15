import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {FilterValuesType} from "./App"

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void;
}

export function TodoList(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
    };

    const onKeyDownChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
    props.addTask(newTaskTitle);
    setNewTaskTitle("")}};

    const addTask = () => {
      props.addTask(newTaskTitle) 
      setNewTaskTitle("")};

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');

    return <div>
      <h3>{props.title}</h3>
      <div>
        <input 
        value={newTaskTitle} 
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownChangeHandler}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>{
        props.tasks.map(el => {
            return <li key={el.id}><input
            type="checkbox" 
            checked={el.isDone} />
            <span>{el.title}</span>
            <button onClick={() => {props.removeTask(el.id)}}>X</button></li>
            })}
      </ul>
   
      <div>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
      </div>
      </div>;
  }
