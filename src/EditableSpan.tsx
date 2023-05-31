import { useState } from "react"



type EditableSpanPropsType = {
    title: string,
  }
  
  function EditableSpan (props: EditableSpanPropsType){
    let [editMode, setEditMode] = useState(false);
    const activateEditMode = () => {
        editMode? setEditMode(false): setEditMode(true)
    }
    return editMode
    ? <input value={props.title}></input>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
  }
  export default EditableSpan