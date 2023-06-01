import {  ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import  AddItemForm  from "./AddItemForm";
import EditableSpan from "./EditableSpan"

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
  changeTaskStatus: (taskId: string,isDone: boolean,todoListId: string) => void;
  changeTaskTitle: (taskId: string,newTitle: string,todoListId: string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList(props: PropsType) {

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodoList = () => props.removeTodoList(props.id);

  const addTask = (title: string) => {
    props.addTask (title, props.id)
  }

  return (
    <div className="bg-card">
      <h2> <EditableSpan title={props.title} onChange={(value) => alert(value)} />
        <Button
          onClick={removeTodoList}
          size="small"
          sx={{ ml: "15px" }}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </h2>

     <AddItemForm  addItem={addTask}/>
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li className={t.isDone ? "is-done" : ""} key={t.id}>
              <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={t.isDone}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>

      <div>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            className={props.filter === "all" ? "active-filter" : ""}
            onClick={onAllClickHandler}
          >
            All
          </Button>
          <Button
            className={props.filter === "active" ? "active-filter" : ""}
            onClick={onActiveClickHandler}
          >
            Active
          </Button>
          <Button
            className={props.filter === "completed" ? "active-filter" : ""}
            onClick={onCompletedClickHandler}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

