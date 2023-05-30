import { useState, ChangeEvent, KeyboardEvent } from "react";
import Input from "@mui/joy/Input";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

type AddItemFormPropsType = {
    addTask: (title: string, todoListId: string) => void
    id: string
  };
  
  const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("");
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };
    const addTask = () => {
      if (title.trim() !== "") {
        props.addTask(title.trim(), props.id);
        setTitle("");
      } else {
        setError("Title is required");
      }
    };
    const onKeyDownChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.key === "Enter") {
        addTask();
      }
    };
    let [error, setError] = useState<string | null>(null);
  
  
    return  <div className="input-block">
    <Input
      value={title}
      onChange={onNewTitleChangeHandler}
      onKeyDown={onKeyDownChangeHandler}
      className={error ? "error" : ""}
      placeholder="Add to your wishlist..."
      variant="outlined"
      color="primary"
    />
  
    <Fab size="small" color="success" aria-label="add" sx={{ m: "5px" }}>
      <AddIcon onClick={addTask} />
    </Fab>
  </div>
  }

  export default AddItemForm;