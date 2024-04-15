import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

type AddItemFormPropsTypes = {
    itemLabel: string
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
            <TextField type="text"
                       label={props.itemLabel} variant="outlined" size="small"
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onNewTitleKeyDownHandler}
                       className={errorInput ? "error" : ""}
                       error={!!errorInput}
                       helperText={errorInput}
            />

            {/*<Button onClick={addTask} variant={"contained"} size="medium" color={"primary"}>+</Button>*/}
            <IconButton onClick={addTask}  size="large" >
                <AddBoxOutlinedIcon fontSize="inherit" />
            </IconButton>

        </div>
    )

}