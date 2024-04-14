import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsTypes = {
    addItem: (value: string) => void
}

export function AddItemForm(props: AddItemFormPropsTypes) {
    let [newTaskTitle, setTaskTitle] = useState<string>("");
    let [errorInput, setErrorInput] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onNewTitleKeyDownHandler = (e: KeyboardEvent) => {
        // debugger;
        if (e.key !== " ") {
            setErrorInput(null)
        }
        if (e.key === "Enter") {
            addTask();
            setTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setErrorInput("Field is required")
            return;
        }
        setErrorInput(null)
        props.addItem(newTaskTitle.trim());
        setTaskTitle("")
    }


    return (
        <div>
            <input type="text"
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyDown={onNewTitleKeyDownHandler}
                   className={errorInput ? "error" : ""}
            />
            <button onClick={addTask}>+
            </button>
            {errorInput && <div className={"error-message"}>{errorInput}</div>}
        </div>
    )

}