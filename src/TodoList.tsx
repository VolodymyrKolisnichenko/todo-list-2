import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filtered: FilterValuesType;
  id: string
};

export function TodoList(props: PropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim());
      setTitle("");
    } else {
      setError("Title is required")
    }
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownChangeHandler}
          className={error? "error": ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((el) => {
          const onRemoveHandler = () => {
            props.removeTask(el.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(el.id, e.currentTarget.checked);

          return (
            <li className={el.isDone === true? "is-done": ""} key={el.id}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={el.isDone}
              />
              <span>{el.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button className={props.filtered === "all"? "active-filter": ""} onClick={onAllClickHandler}>All</button>
        <button className={props.filtered === "active"? "active-filter": ""} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filtered === "completed"? "active-filter": ""} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
