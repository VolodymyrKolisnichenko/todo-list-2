import React, { useState } from "react";
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


    return <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle} onChange={(e) => {
          setNewTaskTitle(e.currentTarget.value)
          }}/>
        <button onClick={() => {
          props.addTask(newTaskTitle) 
          setNewTaskTitle("")}}>+</button>
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
      <button onClick={() => {props.changeFilter('all')}}>All</button>
      <button onClick={() => {props.changeFilter('active')}}>Active</button>
      <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
      </div>
      </div>;
  }
