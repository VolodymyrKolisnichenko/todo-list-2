import { useState, ChangeEvent, KeyboardEvent } from "react";
import Input from "@mui/joy/Input";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./App.css";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

const AddItemForm = (props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
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

  {
    /* <div className="input-block">
</div> */
  }
  return (
    <div>
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
  );
};

export default AddItemForm;
