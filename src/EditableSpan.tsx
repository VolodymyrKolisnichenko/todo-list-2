import { useState, ChangeEvent } from "react";



type EditableSpanPropsType = {
    title: string
  }
  
  function EditableSpan (props: EditableSpanPropsType){
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        editMode? setEditMode(false): setEditMode(true)
        setTitle(props.title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    return editMode
    ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateEditMode} autoFocus></input>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
  }
  export default EditableSpan