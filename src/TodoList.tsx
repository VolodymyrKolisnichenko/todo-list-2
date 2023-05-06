import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/joy/Input';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodoList: (todoListId: string) => void;
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
      props.addTask(title.trim(), props.id);
      setTitle("");
    } else {
      setError("Title is required")
    }
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const removeTodoList = () => props.removeTodoList(props.id)
  return (
    <div className="bg-card">
      <h2>
      {props.title}
      <Button onClick={removeTodoList} size="small" sx={{ml: '15px'}}
      variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      </h2>
      
      <div>
      <Input 
          value={title}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownChangeHandler}
          className={error? "error": ""} 
          placeholder="Add to your wishlist..." 
          variant="outlined" color="primary" />
      
        <Fab size="small" color="success" aria-label="add" sx={{m: '5px'}}>
          <AddIcon onClick={addTask}/>
        </Fab>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map(t => {
          const onRemoveHandler = () => {props.removeTask(t.id, props.id)};
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)};

          return (
            <li className={t.isDone? "is-done": ""} key={t.id}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                    <DeleteIcon />
                </IconButton>
            </li>
          );
        })}
      </ul>

      <div>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button className={props.filter === "all"? "active-filter": ""} onClick={onAllClickHandler}>All</Button>
        <Button className={props.filter === "active"? "active-filter": ""} onClick={onActiveClickHandler}>Active</Button>
        <Button className={props.filter === "completed"? "active-filter": ""} onClick={onCompletedClickHandler}>Completed</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}
